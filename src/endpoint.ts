import memoizee from 'memoizee'
import { jsonToGraphQLQuery } from './jsonToGraphQLQuery'
import { DeepReplace, IResponseListener, Projection } from './types'

type RawEndpoint<I, O, E> = <S extends I>(
  jsonQuery?: S
) => Promise<{ data: Projection<S, O, E>; errors: any[]; warnings: any[]; headers: any; status: any }>

type JsonOutput<O, Ignore> = DeepReplace<O, Ignore, [string | Date, string]>

export type Endpoint<I, O, E> = (<S extends I>(jsonQuery?: S) => Promise<Projection<S, JsonOutput<O, E>, E>>) & {
  memo: <S extends I>(jsonQuery?: S) => Promise<Projection<S, JsonOutput<O, E>, E>>
  memoRaw: RawEndpoint<I, JsonOutput<O, E>, E>
  raw: RawEndpoint<I, JsonOutput<O, E>, E>
}

export const getApiEndpointCreator =
  ({
    getClient,
    typesTree,
    maxAge,
    verbose,
    formatGraphQL,
    responseListeners,
  }: {
    getClient: () => { url: string; headers: { [key: string]: string }; fetch: (...args: any[]) => any }
    responseListeners: IResponseListener[]
    typesTree: any
    maxAge: number
    verbose: boolean
    formatGraphQL: any
  }) =>
  <I = any, O = any, E = any>(kind: 'mutation' | 'query', name: string): Endpoint<I, O, E> => {
    const rawEndpoint: any = async <S extends I>(
      jsonQuery?: S
    ): Promise<{ data: Projection<S, O>; errors: any[]; warnings: any[]; headers: any; status: any }> => {
      const { query, variables } = jsonToGraphQLQuery({ kind, name, jsonQuery, typesTree })
      const start = +new Date()

      const logOptions = {
        kind,
        name,
        formatGraphQL,
        query,
        variables,
      }

      const responseListenerBasics = {
        name,
        query: formatGraphQL(query),
        variables,
      }

      try {
        const { data, errors, warnings, headers, status } = await graphqlRequest({
          client: getClient(),
          query: query,
          variables: variables,
        })

        const response = { data, warnings, headers, status, errors }

        if (verbose && globalThis.document) {
          logRequest({
            ...logOptions,
            response,
            duration: +new Date() - start,
          })
        }

        setTimeout(() =>
          responseListeners.forEach(runResponseListener =>
            runResponseListener({
              ...responseListenerBasics,
              response,
            })
          )
        )

        return { data: data?.[name], errors, warnings, headers, status }
      } catch (error) {
        if (verbose && globalThis.document) {
          logRequest({
            ...logOptions,
            error: error as Error,
            duration: +new Date() - start,
          })
        }

        setTimeout(() =>
          responseListeners.forEach(runResponseListener => runResponseListener({ ...responseListenerBasics, error }))
        )

        throw error
      }
    }

    const endpoint: any = async <S extends I>(jsonQuery?: S): Promise<Projection<S, O>> => {
      const { data } = await rawEndpoint(jsonQuery)
      return data
    }

    const memoizeeOptions = {
      maxAge,
      normalizer: (args: any) => JSON.stringify(args[0]),
    }

    endpoint.raw = rawEndpoint
    endpoint.memo = memoizee(endpoint, memoizeeOptions)
    endpoint.memoRaw = memoizee(rawEndpoint, memoizeeOptions)

    return endpoint
  }

async function graphqlRequest({
  client,
  query,
  variables,
}: {
  client: { url: string; headers: { [p: string]: string }; fetch: (...args: any[]) => Promise<Response> }
  query: string
  variables: { [p: string]: any }
}) {
  const {
    data: { data, errors, warnings },
    headers,
    status,
  } = await client
    .fetch(client.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...client.headers,
      },
      body: JSON.stringify({ query, variables }),
    })
    .then(async (r: any) =>
      r.ok
        ? {
            data: await r.json(),
            headers: r.headers,
            status: r.status,
          }
        : Promise.reject(new Error(`Request failed with status ${r.status}`))
    )

  return { data, errors, warnings, headers, status }
}

function logRequest({
  kind,
  name,
  response,
  error,
  duration,
  formatGraphQL,
  query,
  variables,
}: {
  query: string
  variables: any
  formatGraphQL: any
  kind: string
  name: string
  response?: any
  error?: Error
  duration: number
}) {
  let identifier = `%c#graphql-ts-client ${kind} ${name}`
  let identifierStyles = 'color: transparent; font-size: 0px'

  console.groupCollapsed(
    `%c#graphql-ts-client %c${kind} %c${name} %c(${duration.toFixed(2)}ms)`,
    'color: #f90',
    'color: #999',
    `color: ${response ? 'unset' : '#f00'}; font-weight: bold`,
    'color: #999'
  )

  console.groupCollapsed(`%cQuery ${identifier}`, 'color: #999', identifierStyles)
  console.log(formatGraphQL(query) + identifier, identifierStyles)
  console.groupEnd()
  console.groupCollapsed(`%cVariables ${identifier}`, 'color: #999', identifierStyles)
  console.log(JSON.stringify(variables, null, '  ') + identifier, identifierStyles)
  console.groupEnd()
  console.groupCollapsed(`%cTrace ${identifier}`, 'color: #999', identifierStyles)
  console.trace(identifier, identifierStyles)
  console.groupEnd()

  if (response) {
    console.log('%cResponse'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, response)
  }
  if (error) {
    console.log('%cError'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, error)
  }

  console.groupEnd()
}
