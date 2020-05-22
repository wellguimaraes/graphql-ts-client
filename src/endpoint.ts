import { GraphQLClient } from 'graphql-request'
import memoizee from 'memoizee'
import { jsonToGraphQLQuery } from './jsonToGraphQLQuery'
import { Projection } from './types'

type RawEndpoint<I, O> = <S extends I>(
  jsonQuery?: S
) => Promise<{ data: Projection<S, O>; errors: any[]; warnings: any[]; headers: any; status: any }>

export const getApiEndpointCreator = ({
  getClient,
  typesTree,
  maxAge,
  verbose,
  formatGraphQL,
}: {
  getClient: () => GraphQLClient
  typesTree: any
  maxAge: number
  verbose: boolean
  formatGraphQL: any
}) => <I, O>(
  kind: 'mutation' | 'query',
  name: string
): (<S extends I>(jsonQuery?: S) => Promise<Projection<S, O>>) & {
  memo: <S extends I>(jsonQuery?: S) => Promise<Projection<S, O>>
  memoRaw: RawEndpoint<I, O>
  raw: RawEndpoint<I, O>
} => {
  const rawEndpoint: any = async <S extends I>(
    jsonQuery?: S
  ): Promise<{ data: Projection<S, O>; errors: any[]; warnings: any[]; headers: any; status: any }> => {
    const { query, variables } = jsonToGraphQLQuery({ kind, name, jsonQuery, typesTree })

    const logRequest = ({ response, error, duration }: { response?: any; error?: Error; duration: number }) => {
      if (!verbose) return
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
      if (response) console.log('%cResponse'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, response)
      if (error) console.log('%cError'.padEnd(15, ' ') + identifier, 'color: #999', identifierStyles, error)
      console.groupEnd()
    }

    const start = +new Date()

    try {
      const { data, errors, warnings, headers, status } = (await getClient().rawRequest(query, variables)) as any

      logRequest({ response: { data, warnings, headers, status }, duration: +new Date() - start })

      return { data: data[name], errors, warnings, headers, status }
    } catch (error) {
      logRequest({ error, duration: +new Date() - start })

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
