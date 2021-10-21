import Case from 'case'
import fetch from 'cross-fetch'
import fs, { PathLike } from 'fs'
import {
  getIntrospectionQuery,
  IntrospectionEnumType,
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionInputTypeRef,
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionType,
} from 'graphql'
import orderBy from 'lodash/orderBy'
import set from 'lodash/set'
import * as prettier from 'prettier'

const graphqlTsClientPath = process.env.GQL_CLIENT_DIST_PATH || 'graphql-ts-client/dist'

function gqlScalarToTypescript(gqlType: string) {
  if (/(int|long|double|decimal|float)/i.test(gqlType)) return 'number'
  if (/boolean/i.test(gqlType)) return 'boolean'
  if (/String/i.test(gqlType)) return 'string'

  return gqlType
}

// TODO: separate in two: input and output types
function gqlTypeToTypescript(
  gqlType: IntrospectionOutputTypeRef,
  { required = false, isInput = false, selection = false } = {}
): string {
  if (!gqlType) return ''

  const maybeWrapped = (it: string) => (required || selection ? it : `Maybe<${it}>`)

  // noinspection SuspiciousTypeOfGuard
  if (typeof gqlType === 'string') {
    return maybeWrapped(gqlType)
  }

  if (gqlType.kind.endsWith('OBJECT')) {
    return maybeWrapped((gqlType as any).name + (selection ? 'Selection' : ''))
  }

  if (gqlType.kind === 'NON_NULL') {
    return `${gqlTypeToTypescript(gqlType.ofType, {
      isInput,
      required: true,
      selection,
    })}`
  }

  if (gqlType.kind === 'LIST') {
    return maybeWrapped(
      `${gqlTypeToTypescript(gqlType.ofType, {
        isInput,
        required: true,
        selection,
      })}${selection ? '' : '[]'}`
    )
  }

  if (selection) {
    return ''
  }

  if (gqlType.kind === 'ENUM' && gqlType.name) {
    return maybeWrapped(gqlType.name)
  }

  if (gqlType.kind === 'SCALAR') {
    return maybeWrapped(gqlScalarToTypescript(gqlType.name))
  }

  return ''
}

function gqlFieldToTypescript(field: IntrospectionField, { isInput, selection, defaultValue }: { defaultValue?: any, isInput: boolean; selection: boolean }) {
  let fieldTypeDefinition = gqlTypeToTypescript(field.type, {
    isInput,
    selection,
  })

  fieldTypeDefinition = `${fieldTypeDefinition}`

  if (selection && field.args && field.args.length) {
    let fieldsOnArgs = field.args.map((arg) => gqlFieldToTypescript(arg as IntrospectionField, { defaultValue: arg.defaultValue, isInput: true, selection: false }))

    fieldTypeDefinition = `{ __args${fieldsOnArgs.every(arg => arg.isOptional) ? '?' : ''}: { ${fieldsOnArgs.map(arg => arg.code).join(', ')} }}${fieldTypeDefinition ? ` & ${fieldTypeDefinition}` : ''}`
  }

  const isOptional = defaultValue || selection || fieldTypeDefinition.startsWith('Maybe')
  const rawType = fieldTypeDefinition || (selection && 'boolean')
  const wrappedType = isOptional ? (rawType as string).replace(/Maybe\<(.+?)\>/, '$1') : rawType

  return {
    isOptional: isOptional,
    code: `${field.name}${isOptional ? '?:' : ':'} ${wrappedType}`
  }
}

function gqlEndpointToTypescript(kind: 'mutation' | 'query', endpoint: IntrospectionField): string {
  let selectionType = gqlTypeToTypescript(endpoint.type, {
    isInput: false,
    selection: true,
  })

  if (endpoint.args && endpoint.args.length) {
    const fieldsOnArgs = endpoint.args.map((arg) => gqlFieldToTypescript(arg as IntrospectionField, { defaultValue: arg.defaultValue, isInput: true, selection: false }))
    selectionType = `{ __args${fieldsOnArgs.every(arg => arg.isOptional) ? '?' : ''}: { ${fieldsOnArgs.map(arg => arg.code).join(', ')} }}${selectionType ? ` & ${selectionType}` : ''}`
  }

  const outputType = gqlTypeToTypescript(endpoint.type)
  const wrappedOutputType = /^(string|number|boolean)$/.test(outputType) ? outputType : `DeepRequired<${outputType}>`
  const inputType = selectionType || 'undefined'

  return `${endpoint.name}: apiEndpoint('${kind}', '${endpoint.name}') as Endpoint<${inputType}, ${wrappedOutputType}, AllEnums>`
}

function gqlSchemaToTypescript(
  gqlType: any | IntrospectionObjectType | IntrospectionInputObjectType | IntrospectionEnumType,
  { selection = false }
) {
  const rawKind = gqlType.kind || gqlType.type

  if (rawKind === 'SCALAR') {
    return `export type ${gqlType.name} = ${/date/i.test(gqlType.name) ? 'IDate' : 'string'}`
  }

  if (rawKind === 'ENUM')
    return `
      export enum ${gqlType.name} {
        ${orderBy(gqlType.enumValues, 'name')
          .map((_: any) => `${Case.camel(_.name)} = '${_.name}'`)
          .join(',\n  ')}
      }`

  const fields = (gqlType.fields && gqlType.fields) || (gqlType.inputFields && gqlType.inputFields) || []

  return `
    export interface ${gqlType.name}${selection ? 'Selection' : ''} {
      ${fields
        .map((_: any) =>
          gqlFieldToTypescript(_, {
            isInput: gqlType.kind === 'INPUT_OBJECT',
            selection,
          }).code
        )
        .join(',\n  ')}
    }`
}

function getGraphQLInputType(type: IntrospectionInputTypeRef): string {
  switch (type.kind) {
    case 'NON_NULL':
      return `${getGraphQLInputType(type.ofType)}!`

    case 'SCALAR':
    case 'INPUT_OBJECT':
    case 'ENUM':
      return type.name

    case 'LIST':
      return `[${getGraphQLInputType(type.ofType)}]`

    default:
      return ''
  }
}

function getGraphQLOutputType(type: IntrospectionOutputTypeRef): string {
  switch (type.kind) {
    case 'LIST':
      return `${getGraphQLOutputType(type.ofType)}[]`

    case 'NON_NULL':
      return getGraphQLOutputType(type.ofType)

    case 'OBJECT':
      return type.name

    default:
      return ''
  }
}

function getTypesTreeCode(types: IntrospectionObjectType[]) {
  const typesTree = {}

  types.forEach(type =>
    type.fields
      .filter(_ => _.args && _.args.length)
      .forEach(_ =>
        _.args.forEach(a => {
          let inputType = getGraphQLInputType(a.type)
          if (inputType) {
            set(typesTree, `${type.name}.${_.name}.__args.${a.name}`, inputType)
          }
        })
      )
  )

  types.forEach(t =>
    t.fields.forEach(f => {
      let outputType = getGraphQLOutputType(f.type)
      if (outputType) {
        set(typesTree, `${t.name}.${f.name}.__shape`, outputType)
      }
    })
  )

  return `
    const typesTree = {
      ${Object.entries(typesTree)
        .map(([key, value]) => {
          let entryCode = Object.entries(value as any)
            .map(([k, v]: any) => {
              const cleanShapeType = v.__shape && v.__shape.replace(/[\[\]!?]/g, '')
              const fieldsCode =
                v.__shape && typesTree.hasOwnProperty(cleanShapeType) ? `__fields: typesTree.${cleanShapeType},` : ''

              const argsCode = v.__args
                ? `__args: {
                      ${Object.entries(v.__args)
                        .map(([k, v]) => `${k}: '${v}'`)
                        .join(',\n')}
                    }`
                : ''

              return fieldsCode || argsCode
                ? `get ${k}(): any {
                  return {
                    ${fieldsCode}
                    ${argsCode}
                  }
                }`
                : `${k}: {}`
            })
            .filter(Boolean)
            .join(',\n')
            .trim()
          return (
            entryCode &&
            `
              ${key}: { 
                ${entryCode} 
              }`
          )
        })
        .filter(Boolean)
        .join(',\n')}
    }
  `
}

type IClientOptions = {
  output?: PathLike
  clientName?: string
  headers?: { [key: string]: string }
  endpoint: string
  verbose?: boolean
  formatGraphQL?: boolean
}

function generateClientCode(types: ReadonlyArray<IntrospectionType>, options: Omit<IClientOptions, 'output'>) {
  const queries = (<IntrospectionObjectType>types.find(it => it.name === 'Query'))?.fields || []
  const mutations = (<IntrospectionObjectType>types.find(it => it.name === 'Mutation'))?.fields || []
  const enums = types.filter(it => it.kind === 'ENUM' && !it.name.startsWith('__')) as IntrospectionEnumType[]
  const scalars = types.filter(it => it.kind === 'SCALAR' && !/decimal|int|float|string|long|boolean/i.test(it.name)) as IntrospectionEnumType[]
  const objectTypes = types.filter(it => ['OBJECT', 'INPUT_OBJECT'].includes(it.kind) && !it.name.startsWith('__')) as (
    | IntrospectionObjectType
    | IntrospectionInputObjectType
  )[]

  const forInputExtraction = types.filter(
    it => !it.name.startsWith('__') && ['OBJECT'].includes(it.kind)
  ) as IntrospectionObjectType[]

  const clientName = options.clientName || 'client'

  // language=TypeScript
  const clientCode = `
    // noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols
    
    import { DeepRequired } from 'ts-essentials'
    import { getApiEndpointCreator, Endpoint } from '${graphqlTsClientPath}/endpoint'
    import { Maybe, IResponseListener } from '${graphqlTsClientPath}/types'
    import fetch from 'cross-fetch'

    ${
      options.formatGraphQL || options.verbose
        ? `
      import { format as formatCode } from "prettier/standalone"
      import * as parserGraphql from "prettier/parser-graphql"
      
      const formatGraphQL = (query: string) => formatCode(query, {parser: 'graphql', plugins: [parserGraphql]})`
        : `
      const formatGraphQL = (query: string) => query`
    }

    // Scalars
    export type IDate = string | Date
    ${scalars.map(it => gqlSchemaToTypescript(it, { selection: false }))
      .join('\n')}

    // Enums
    ${enums.map(it => gqlSchemaToTypescript(it, { selection: false }))
      .join('\n')}
    
    type AllEnums = ${enums.map(it => it.name).join(' | ')}

    // Input/Output Types
    ${objectTypes.map(it => `
    /**
     * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
     */
    ${gqlSchemaToTypescript(it, { selection: false })}`)
    .join('\n')}

    // Selection Types
    ${objectTypes.map(it => gqlSchemaToTypescript(it, { selection: true }))
      .join('\n')}

    // Schema Resolution Tree
    ${getTypesTreeCode(forInputExtraction)}

    let verbose = ${Boolean(options.verbose)}
    let headers = {} as any
    let url = '${options.endpoint}'
    let responseListeners: IResponseListener[] = []
    let apiEndpoint = getApiEndpointCreator({
      getClient: () => ({ url, headers, fetch }),
      responseListeners,
      maxAge: 30000,
      verbose,
      typesTree,
      formatGraphQL
    })

    export const ${clientName} = {
      addResponseListener: (listener: IResponseListener) => responseListeners.push(
        listener),
      setHeader: (key: string, value: string) => {
        headers[key] = value
      },
      setHeaders: (newHeaders: { [k: string]: string }) => {
        headers = newHeaders
      },
      setUrl: (_url: string) => url = _url,
      queries: {
        ${queries.map(q => gqlEndpointToTypescript('query', q)).join(',\n  ')}
      },
      mutations: {
        ${mutations.map(q => gqlEndpointToTypescript('mutation', q))
          .join(',\n  ')}
      }
    }

    export default ${clientName}`

  return prettier.format(clientCode, { semi: false, parser: 'typescript' })
}

export async function generateTypescriptClient({ output, ...options }: IClientOptions): Promise<string> {
  try {
    const {
      data: { __schema: { types } },
    } = (await fetch(options.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    }).then(async (r: any) => r.json()))

    const formattedClientCode = generateClientCode(types, options)

    if (output) {
      fs.writeFileSync(output, formattedClientCode, { encoding: 'utf8' })
    }

    return formattedClientCode
  } catch (e) {
    console.error('\nThe GraphQL introspection request failed\n')
    console.error((e as any).response || e)

    throw e
  }
}
