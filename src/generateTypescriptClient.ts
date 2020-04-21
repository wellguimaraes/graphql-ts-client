import fs, { PathLike } from 'fs'
import { introspectionQuery, IntrospectionQuery } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { Options } from 'graphql-request/dist/src/types'
import {
  IntrospectionEnumType,
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionInputTypeRef,
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
} from 'graphql/utilities/introspectionQuery'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'
import * as prettier from 'prettier'
import Case from 'case'

enum Scalars {
  number = 'number',
  IDate = 'IDate',
  boolean = 'boolean',
  UUID = 'UUID',
  string = 'string',
}

function gqlScalarToTypescript(gqlType: string) {
  if (/(int|long|double|decimal)/i.test(gqlType)) return 'number'
  if (/date/i.test(gqlType)) return 'IDate'
  if (/boolean/i.test(gqlType)) return 'boolean'
  if (/uuid/i.test(gqlType)) return 'UUID'

  return 'string'
}

// TODO: separate in two: input and output types
function gqlTypeToTypescript(
  gqlType: IntrospectionOutputTypeRef,
  { required = false, isInput = false, selection = false } = {}
): string {
  if (!gqlType) return ''

  const maybeWrapped = (it: string) => (required || selection ? it : `Maybe<${it}>`)

  if (typeof gqlType === 'string') return maybeWrapped(gqlType)

  if (gqlType.kind.endsWith('OBJECT')) return maybeWrapped((gqlType as any).name + (selection ? 'Selection' : ''))

  if (gqlType.kind === 'NON_NULL')
    return `${gqlTypeToTypescript(gqlType.ofType, {
      isInput,
      required: true,
      selection,
    })}`

  if (gqlType.kind === 'LIST')
    return maybeWrapped(
      `${gqlTypeToTypescript(gqlType.ofType, {
        isInput,
        required: true,
        selection,
      })}${selection ? '' : '[]'}`
    )

  if (selection) return ''

  if (gqlType.kind === 'ENUM' && gqlType.name) return gqlType.name

  if (gqlType.kind === 'SCALAR') {
    return maybeWrapped(gqlScalarToTypescript(gqlType.name))
  }

  return ''
}

function gqlFieldToTypescript(it: IntrospectionField, { isInput, selection }: { isInput: boolean; selection: boolean }): string {
  let fieldTypeDefinition = gqlTypeToTypescript(it.type, {
    isInput,
    selection,
  })

  fieldTypeDefinition = fieldTypeDefinition in Scalars && selection ? '' : `${fieldTypeDefinition}`

  if (selection && it.args && it.args.length) {
    let fieldsOnArgs = it.args.map((_: any) => gqlFieldToTypescript(_, { isInput: true, selection: false })).join(', ')

    fieldTypeDefinition = `{ __args: { ${fieldsOnArgs} }}${fieldTypeDefinition ? ` & ${fieldTypeDefinition}` : ''}`
  }

  const isOptional = selection || fieldTypeDefinition.startsWith('Maybe')
  const finalType = fieldTypeDefinition || (selection && 'boolean')
  return `${it.name}${isOptional ? '?:' : ':'} ${isOptional ? (finalType as string).replace(/Maybe\<(.+?)\>/, '$1') : finalType}`
}

function gqlEndpointToTypescript(kind: 'mutation' | 'query', it: IntrospectionField): string {
  let selectionType = gqlTypeToTypescript(it.type, {
    isInput: false,
    selection: true,
  })

  if (it.args && it.args.length) {
    const fieldsOnArgs = it.args.map((_: any) => gqlFieldToTypescript(_, { isInput: true, selection: false })).join(', ')

    selectionType = `{ __args: { ${fieldsOnArgs} }}${selectionType ? ` & ${selectionType}` : ''}`
  }

  const outputType = gqlTypeToTypescript(it.type)
  const inputType = selectionType || 'undefined'

  return `${it.name}: apiEndpoint<${inputType}, DeepRequired<${outputType}>>('${kind}', '${it.name}')`
}

function gqlSchemaToTypescript(
  it: any | IntrospectionObjectType | IntrospectionInputObjectType | IntrospectionEnumType,
  { selection = false }
) {
  const rawKind = it.kind || it.type

  if (rawKind === 'ENUM')
    return `
      export enum ${it.name} {
        ${orderBy(it.enumValues, 'name')
          .map((_: any) => `${Case.camel(_.name)} = '${_.name}'`)
          .join(',\n  ')}
      }`

  const fields = (it.fields && it.fields) || (it.inputFields && it.inputFields) || []

  return `
    export interface ${it.name}${selection ? 'Selection' : ''} {
      ${fields
        .map((_: any) =>
          gqlFieldToTypescript(_, {
            isInput: it.kind === 'INPUT_OBJECT',
            selection,
          })
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

function extractInputTypes(types: IntrospectionObjectType[]) {
  const outputTypesTree = {}


  types.forEach(type =>
    type.fields
      .filter(_ => _.args && _.args.length)
      .forEach(_ =>
        _.args.forEach(a => {
          let inputType = getGraphQLInputType(a.type)
          if (inputType) {
            set(outputTypesTree, `${type.name}.${_.name}.__args.${a.name}`, inputType)
          }
        })
      )
  )

  types.forEach(t =>
    t.fields.forEach(f => {
      let outputType = getGraphQLOutputType(f.type)
      if (outputType) {
        set(outputTypesTree, `${t.name}.${f.name}.__shape`, outputType)
      }
    })
  )

  return `
    const typesTree = {
      ${Object.entries(outputTypesTree)
        .map(([key, value]) => {
          let entryCode = Object.entries(value as any)
            .map(([k, v]: any) => {
              const cleanShapeType = v.__shape && v.__shape.replace(/[\[\]!?]/g,'')
              const fieldsCode = v.__shape && outputTypesTree.hasOwnProperty(cleanShapeType) ? `__fields: typesTree.${cleanShapeType},` : ''

              const argsCode = v.__args
                ? `__args: {
                      ${Object.entries(v.__args)
                        .map(([k, v]) => `${k}: '${v}'`)
                        .join(',\n')}
                    }`
                : ''

              return (
                (fieldsCode || argsCode) ?
                `get ${k}(): any {
                  return {
                    ${fieldsCode}
                    ${argsCode}
                  }
                }` : `${k}: {}`
              )
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

export async function generateTypescriptClient({
  endpoint,
  output,
  ...options
}: Options & { output: PathLike; endpoint: string }): Promise<void> {
  const client = new GraphQLClient(endpoint, options)

  const {
    __schema: { types },
  } = (await client.request(introspectionQuery)) as IntrospectionQuery

  const queries = (types.find(it => it.name === 'Query') as IntrospectionObjectType).fields
  const mutations = (types.find(it => it.name === 'Mutation') as IntrospectionObjectType).fields
  const enums = types.filter(it => it.kind === 'ENUM' && !it.name.startsWith('__')) as IntrospectionEnumType[]
  const objectTypes = types.filter(it => ['OBJECT', 'INPUT_OBJECT'].includes(it.kind) && !it.name.startsWith('__')) as (
    | IntrospectionObjectType
    | IntrospectionInputObjectType
  )[]

  const forInputExtraction = types.filter(
    it => !it.name.startsWith('__') && ['OBJECT'].includes(it.kind)
  ) as IntrospectionObjectType[]

  const clientCode = `
    import { GraphQLClient } from 'graphql-request'
    import { Options } from 'graphql-request/dist/src/types'
    import { DeepRequired } from 'ts-essentials'
    import { getApiEndpointCreator } from 'graphql-ts-client/dist/endpoint'
    import { UUID, IDate, Maybe } from 'graphql-ts-client/dist/types'

    ${enums.map(it => gqlSchemaToTypescript(it, { selection: false })).join('\n')}
    ${objectTypes.map(it => gqlSchemaToTypescript(it, { selection: false })).join('\n')}
    ${objectTypes.map(it => gqlSchemaToTypescript(it, { selection: true })).join('\n')}
    ${extractInputTypes(forInputExtraction)}

    let client = new GraphQLClient('${endpoint}')
    let apiEndpoint = getApiEndpointCreator({ getClient: () => client, typesTree, maxAge: 30000 })

    export default {
      setClient: (url: string, options?: Options) => { client = new GraphQLClient(url, options) },
      setHeader: (key: string, value: string) => { client.setHeader(key, value) },
      setHeaders: (headers: { [k: string]: string }) => { client.setHeaders(headers) },
      queries: {
        ${queries.map(q => gqlEndpointToTypescript('query', q)).join(',\n  ')}
      },
      mutations: {
        ${mutations.map(q => gqlEndpointToTypescript('mutation', q)).join(',\n  ')}
      }
    }`

  const formattedClientCode = prettier.format(clientCode, { semi: false, parser: 'typescript' })

  fs.writeFileSync(output, formattedClientCode, { encoding: 'utf8' })
}
