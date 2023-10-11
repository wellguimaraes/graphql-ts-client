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
import { kebabCase } from 'lodash'
import orderBy from 'lodash/orderBy'
import set from 'lodash/set'
import md5 from 'md5'
import os from 'os'
import path from 'path'
import * as prettier from 'prettier'
import pkg from '../package.json'

const tempDir = fs.realpathSync(os.tmpdir())

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

    fieldTypeDefinition = `{ __headers?: {[key: string]: string}; __retry?: boolean; __alias?: string; __args${
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

function getArgsType(endpoint: IntrospectionField) {
  const fieldsOnArgs = endpoint.args.map(arg =>
    gqlFieldToTypescript(arg as unknown as IntrospectionField, {
      defaultValue: arg.defaultValue,
      isInput: true,
      selection: false,
    })
  )
  const argsType = `{ ${fieldsOnArgs.map(arg => arg.code).join(', ')} }`
  const argsFullyOptional = fieldsOnArgs.every(arg => arg.isOptional)

  return { alias: Case.pascal(`${endpoint.name}Args`), type: argsType, optional: argsFullyOptional }
}

function gqlEndpointToCode(kind: 'mutation' | 'query', endpoint: IntrospectionField, codeOutputType: 'ts' | 'js'): string {
  const selectionType = gqlTypeToTypescript(endpoint.type, {
    isInput: false,
    selection: true,
  })

  const argsType = endpoint.args && endpoint.args.length ? getArgsType(endpoint) : null
  const inputType = `{
    __headers?: {[key: string]: string};
    __retry?: boolean;
    __alias?: string;
    ${argsType ? `__args${argsType.optional ? '?' : ''}: ${argsType.alias}` : ''}
  }${selectionType ? ` & ${selectionType}` : ''}`

  const outputType = gqlTypeToTypescript(endpoint.type, { required: true })
  const wrappedOutputType = /^(string|number|boolean)$/.test(outputType) ? outputType : `DeepRequired<${outputType}>`

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
  introspectionEndpoint?: string
  endpoint: string
  verbose?: boolean
  formatGraphQL?: boolean
  skipCache?: boolean
  errorsParser?: (errors: any[]) => any
}

type FetchIntrospectionOptions = Omit< IClientOptions, 'output' | 'introspectionEndpoint'>

function generateClientCode(types: ReadonlyArray<IntrospectionType>, options: Omit<IClientOptions, 'output'>) {
  const typesHash = md5(`${JSON.stringify(options)}__${JSON.stringify(types)}`)
  const clientCacheFileName = `gql-ts-client__client__${typesHash}__${pkg.version}.json`
  const clientCacheFilePath = path.resolve(tempDir, clientCacheFileName)

  if (!options.skipCache && fs.existsSync(clientCacheFilePath)) {
    return JSON.parse(fs.readFileSync(clientCacheFilePath, { encoding: 'utf8' }))
  }

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
    let errorsParser = ${options.errorsParser}
    // noinspection JSUnusedLocalSymbols
    let apiEndpoint = getApiEndpointCreator({
      getClient: () => ({ url, headers, retryConfig }),
      responseListeners,
      maxAge: 30000,
      verbose,
      typesTree,
      formatGraphQL,
      errorsParser
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
    // noinspection TypeScriptUnresolvedVariable, ES6UnusedImports, JSUnusedLocalSymbols, TypeScriptCheckImport
    import { DeepRequired } from 'ts-essentials'
    import { Maybe, IResponseListener, Endpoint } from '${graphqlTsClientPath}'

    // Scalars
    export type IDate = string | Date
    ${scalars.map(it => gqlSchemaToCode(it, { selection: false, outputType: 'ts' })).join('\n')}

    // Enums
    ${enums.map(it => gqlSchemaToCode(it, { selection: false, outputType: 'ts' })).join('\n')}
    
    type AllEnums = ${enums.length ? enums.map(it => it.name).join(' | ') : 'never'}
    
    // Args
    ${[...queries, ...mutations]
      .map(query => {
        const argsType = getArgsType(query)
        return `export interface ${argsType.alias} ${argsType.type}`
      })
      .join('\n')}

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
    ${objectTypes
      .filter(it => it.name !== 'Query')
      .map(it => gqlSchemaToCode(it, { selection: true, outputType: 'ts' }))
      .join('\n')}
    
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

  const output = {
    js: esbuild.transformSync(jsCode, { format: 'cjs', loader: 'js' }).code,
    typings: prettier.format(typingsCode, { semi: false, parser: 'typescript' }),
  }

  fs.writeFileSync(clientCacheFilePath, JSON.stringify(output))

  return output
}

async function fetchIntrospection({ endpoint, headers }: FetchIntrospectionOptions) {
  const introspectionCacheFileName = `gql-ts-client__introspection__${kebabCase(endpoint)}.json`
  const introspectionCacheFilePath = path.resolve(tempDir, introspectionCacheFileName)

  let loadedFromCache = false
  let types: any

  const { data } = await axios
    .post(
      endpoint,
      { query: getIntrospectionQuery() },
      {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    )
    .catch(() => {
      const errorMessage = `The GraphQL introspection request failed (${endpoint})`
      if (fs.existsSync(introspectionCacheFilePath)) {
        const cachedSchema = JSON.parse(fs.readFileSync(introspectionCacheFilePath, { encoding: 'utf8' }))
        loadedFromCache = true
        console.warn(`Successfully restored from local cache.`)
        return { data: cachedSchema }
      } else {
        return Promise.reject(errorMessage)
      }
    })

  types = data.data.__schema.types

  if (!loadedFromCache) {
    console.log(`Successfully loaded GraphQL introspection from ${endpoint}`)

    fs.writeFileSync(introspectionCacheFilePath, JSON.stringify(data), {
      encoding: 'utf8',
    })
  }

  return types
}

export async function generateTypescriptClient({ introspectionEndpoint, output, ...options }: IClientOptions): Promise<{ typings: string; js: string }> {
  axiosRetry(axios, { retries: 5, retryDelay: retryCount => 1000 * 2 ** retryCount })

  const types = await fetchIntrospection({
    ...options,
    endpoint: introspectionEndpoint || options.endpoint,
  })

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
