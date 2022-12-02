import axios from 'axios'
import axiosRetry from 'axios-retry'
import Case from 'case'
import * as esbuild from 'esbuild'
import * as fs from 'fs'
import { PathLike } from 'fs'
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
import path from 'path'
import * as prettier from 'prettier'

const graphqlTsClientPath = process.env.GQL_CLIENT_DIST_PATH || 'graphql-ts-client/dist'

function gqlScalarToTypescript(gqlType: string) {
  if (/(int|long|double|decimal|float)/i.test(gqlType)) return 'number'
  if (/boolean/i.test(gqlType)) return 'boolean'
  if (/String/i.test(gqlType)) return 'string'

  return gqlType
}

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

function gqlFieldToTypescript(
  field: IntrospectionField,
  { isInput, selection, defaultValue }: { defaultValue?: any; isInput: boolean; selection: boolean }
) {
  let fieldTypeDefinition = gqlTypeToTypescript(field.type, {
    isInput,
    selection,
  })

  fieldTypeDefinition = `${fieldTypeDefinition}`

  if (selection && field.args && field.args.length) {
    let fieldsOnArgs = field.args.map(arg =>
      gqlFieldToTypescript(arg as unknown as IntrospectionField, {
        defaultValue: arg.defaultValue,
        isInput: true,
        selection: false,
      })
    )

    fieldTypeDefinition = `{ __headers?: {[key: string]: value}; __retry?: boolean; __alias?: string; __args${
      fieldsOnArgs.every(arg => arg.isOptional) ? '?' : ''
    }: { ${fieldsOnArgs.map(arg => arg.code).join(', ')} }}${fieldTypeDefinition ? ` & ${fieldTypeDefinition}` : ''}`
  }

  const isOptional = defaultValue || selection || fieldTypeDefinition.startsWith('Maybe')
  const rawType = fieldTypeDefinition || (selection && 'boolean')
  const wrappedType = isOptional ? (rawType as string).replace(/Maybe<(.+?)>/, '$1') : rawType

  return {
    isOptional: isOptional,
    code: `${field.name}${isOptional ? '?:' : ':'} ${wrappedType}`,
  }
}

function gqlEndpointToCode(kind: 'mutation' | 'query', endpoint: IntrospectionField, codeOutputType: 'ts' | 'js'): string {
  let selectionType = gqlTypeToTypescript(endpoint.type, {
    isInput: false,
    selection: true,
  })

  if (endpoint.args && endpoint.args.length) {
    const fieldsOnArgs = endpoint.args.map(arg =>
      gqlFieldToTypescript(arg as unknown as IntrospectionField, {
        defaultValue: arg.defaultValue,
        isInput: true,
        selection: false,
      })
    )
    selectionType = `{ __headers?: {[key: string]: value}; __retry?: boolean; __alias?: string; __args${
      fieldsOnArgs.every(arg => arg.isOptional) ? '?' : ''
    }: { ${fieldsOnArgs.map(arg => arg.code).join(', ')} }}${selectionType ? ` & ${selectionType}` : ''}`
  }

  const outputType = gqlTypeToTypescript(endpoint.type, { required: true })
  const wrappedOutputType = /^(string|number|boolean)$/.test(outputType) ? outputType : `DeepRequired<${outputType}>`
  const inputType = selectionType || 'undefined'

  return codeOutputType === 'ts'
    ? `${endpoint.name}: Endpoint<${inputType}, ${wrappedOutputType}, AllEnums>`
    : `${endpoint.name}: apiEndpoint('${kind}', '${endpoint.name}')`
}

function gqlSchemaToCode(
  gqlType: any | IntrospectionObjectType | IntrospectionInputObjectType | IntrospectionEnumType,
  { selection = false, outputType }: { selection: boolean; outputType: 'js' | 'ts' }
) {
  const rawKind = gqlType.kind || gqlType.type

  if (rawKind === 'SCALAR') {
    return outputType === 'ts' ? `export declare type ${gqlType.name} = ${/date/i.test(gqlType.name) ? 'IDate' : 'string'}` : ''
  }

  if (rawKind === 'ENUM')
    return outputType === 'ts'
      ? `
      export declare enum ${gqlType.name} {
        ${orderBy(gqlType.enumValues, 'name')
          .map((_: any) => `${Case.camel(_.name)} = '${_.name}'`)
          .join(',\n  ')}
      }`
      : `export const ${gqlType.name} = {${orderBy(gqlType.enumValues, 'name')
          .map((_: any) => `${Case.camel(_.name)}: '${_.name}'`)
          .join(',\n  ')}}`

  const fields = (gqlType.fields && gqlType.fields) || (gqlType.inputFields && gqlType.inputFields) || []

  return outputType === 'ts'
    ? `
    export interface ${gqlType.name}${selection ? 'Selection' : ''} {
      ${fields
        .map(
          (_: any) =>
            gqlFieldToTypescript(_, {
              isInput: gqlType.kind === 'INPUT_OBJECT',
              selection,
            }).code
        )
        .join(',\n  ')}
    }`
    : ''
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
                ? `get ${k}() {
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
  const scalars = types.filter(
    it => it.kind === 'SCALAR' && !/decimal|int|float|string|long|boolean/i.test(it.name)
  ) as IntrospectionEnumType[]
  const objectTypes = types.filter(it => ['OBJECT', 'INPUT_OBJECT'].includes(it.kind) && !it.name.startsWith('__')) as (
    | IntrospectionObjectType
    | IntrospectionInputObjectType
  )[]

  const forInputExtraction = types.filter(
    it => !it.name.startsWith('__') && ['OBJECT'].includes(it.kind)
  ) as IntrospectionObjectType[]

  const clientName = options.clientName || 'client'

  // language=JavaScript
  const jsCode = `
    // noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols
    import { getApiEndpointCreator } from '${graphqlTsClientPath}/endpoint'
    
    ${
      options.formatGraphQL || options.verbose
        ? `
      import { format as formatCode } from "prettier/standalone"
      import parserGraphql from "prettier/parser-graphql"
      
      const formatGraphQL = (query) => formatCode(query, {parser: 'graphql', plugins: [parserGraphql]})`
        : `
      const formatGraphQL = (query) => query`
    }
    
    // Enums
    ${enums.map(it => gqlSchemaToCode(it, { selection: false, outputType: 'js' })).join('\n')}

    // Schema Resolution Tree
    ${getTypesTreeCode(forInputExtraction)}

    let verbose = ${Boolean(options.verbose)}
    let headers = {}
    let url = '${options.endpoint}'
    let retryConfig = {
      max: 0,
      before: undefined,
      waitBeforeRetry: 0
    }
    let responseListeners = []
    // noinspection JSUnusedLocalSymbols
    let apiEndpoint = getApiEndpointCreator({
      getClient: () => ({ url, headers, retryConfig }),
      responseListeners,
      maxAge: 30000,
      verbose,
      typesTree,
      formatGraphQL
    })

    export const ${clientName} = {
      addResponseListener: (listener) => responseListeners.push(
        listener),
      setHeader: (key, value) => {
        headers[key] = value
      },
      setHeaders: (newHeaders) => {
        headers = newHeaders
      },
      setRetryConfig: (options) => {
        if (!Number.isInteger(options.max) || options.max < 0) {
          throw new Error('retryOptions.max should be a non-negative integer')
        }
        
        retryConfig = { 
          max: options.max,
          waitBeforeRetry: options.waitBeforeRetry,
          before: options.before 
        }
      },
      setUrl: (_url) => url = _url,
      queries: {
        ${queries.map(query => gqlEndpointToCode('query', query, 'js')).join(',\n')}
      },
      mutations: {
        ${mutations.map(mutation => gqlEndpointToCode('mutation', mutation, 'js')).join(',\n')}
      }
    }

    export default ${clientName}`

  // language=TypeScript
  const typingsCode = `
    // noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols
    
    import { DeepRequired } from 'ts-essentials'
    import { Maybe, IResponseListener, Endpoint } from '${graphqlTsClientPath}/types'

    // Scalars
    export type IDate = string | Date
    ${scalars.map(it => gqlSchemaToCode(it, { selection: false, outputType: 'ts' })).join('\n')}

    // Enums
    ${enums.map(it => gqlSchemaToCode(it, { selection: false, outputType: 'ts' })).join('\n')}
    
    type AllEnums = ${enums.map(it => it.name).join(' | ')}

    // Input/Output Types
    ${objectTypes
      .map(
        it => `
    /**
     * @deprecated Avoid directly using this interface. Instead, create a type alias based on the query/mutation return type.
     */
    ${gqlSchemaToCode(it, { selection: false, outputType: 'ts' })}`
      )
      .join('\n')}

    // Selection Types
    ${objectTypes.map(it => gqlSchemaToCode(it, { selection: true, outputType: 'ts' })).join('\n')}
    
    export declare const ${clientName}: {
      addResponseListener: (listener: IResponseListener) => void
      setHeader: (key: string, value: string) => void
      setHeaders: (newHeaders: { [k: string]: string }) => void,
      setUrl: (url: string) => void,
      setRetryConfig: (options: { max: number, waitBeforeRetry?: number, before?: IResponseListener }) => void
      queries: {
        ${queries.map(q => gqlEndpointToCode('query', q, 'ts')).join(',\n')}
      },
      mutations: {
        ${mutations.map(q => gqlEndpointToCode('mutation', q, 'ts')).join(',\n')}
      }
    }

    export default ${clientName}`

  return {
    js: esbuild.transformSync(jsCode, { format: 'cjs', loader: 'js' }).code,
    typings: prettier.format(typingsCode, { semi: false, parser: 'typescript' }),
  }
}

export async function generateTypescriptClient({ output, ...options }: IClientOptions): Promise<{ typings: string; js: string }> {
  axiosRetry(axios, { retries: 5, retryDelay: retryCount => 1000 * 2 ** retryCount })

  const {
    data: {
      data: {
        __schema: { types },
      },
    },
  } = await axios
    .post(
      options.endpoint,
      { query: getIntrospectionQuery() },
      {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }
    )
    .catch(() => {
      console.error(`The GraphQL introspection request failed (${options.endpoint})`)
      process.exit(1)
    })

  console.log(`Successfully loaded GraphQL introspection from ${options.endpoint}`)

  const { js, typings } = generateClientCode(types, options)

  if (output && typeof output === 'string') {
    const outputDir = path.dirname(output)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(output.replace(/(\.(ts|js))?$/, '.d.ts'), typings, { encoding: 'utf8' })
    fs.writeFileSync(output.replace(/(\.(ts|js))?$/, '.js'), js, { encoding: 'utf8' })
  }

  return { js, typings }
}
