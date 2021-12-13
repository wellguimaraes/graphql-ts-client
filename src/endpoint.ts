import memoizee from 'memoizee'
import { graphqlRequest } from './graphqlRequest'
import { jsonToGraphQLQuery } from './jsonToGraphQLQuery'
import { logRequest } from './logging'
import { ClientConfig, Endpoint, IResponseListener, Projection } from './types'

export const getApiEndpointCreator =
  (apiConfig: {
    getClient: () => ClientConfig
    responseListeners: IResponseListener[]
    typesTree: any
    maxAge: number
    verbose: boolean
    formatGraphQL: any
  }) =>
  <I = any, O = any, E = any>(kind: 'mutation' | 'query', queryName: string): Endpoint<I, O, E> => {
    const rawEndpoint: any = async <S extends I>(
      jsonQuery?: S
    ): Promise<{
      data: Projection<S, O>
      errors: any[]
      warnings: any[]
      headers: any
      status: any
    }> => {
      const alias = (jsonQuery as any).__alias || queryName
      const { query, variables } = jsonToGraphQLQuery({ kind, queryName, jsonQuery, typesTree: apiConfig.typesTree })
      const start = +new Date()

      const logOptions = {
        kind,
        queryName: alias,
        formatGraphQL: apiConfig.formatGraphQL,
        query,
        variables,
      }

      const responseListener = {
        queryName: alias,
        query: apiConfig.formatGraphQL(query),
        variables,
      }

      try {
        const { data, errors, warnings, headers, status } = await graphqlRequest({
          queryName: alias,
          client: apiConfig.getClient(),
          query,
          variables,
        })

        const response = { data, warnings, headers, status, errors }

        if (apiConfig.verbose && globalThis.document) {
          logRequest({
            ...logOptions,
            response,
            duration: +new Date() - start,
          })
        }

        setTimeout(() =>
          apiConfig.responseListeners.forEach(runResponseListener =>
            runResponseListener({
              ...responseListener,
              response,
            })
          )
        )

        return { data: data?.[alias], errors, warnings, headers, status }
      } catch (error) {
        if (apiConfig.verbose && globalThis.document) {
          logRequest({
            ...logOptions,
            error: error as Error,
            duration: +new Date() - start,
          })
        }

        setTimeout(() => apiConfig.responseListeners.forEach(runResponseListener => runResponseListener(responseListener)))

        throw error
      }
    }

    const endpoint: any = async <S extends I>(jsonQuery?: S): Promise<Projection<S, O>> => {
      const { data } = await rawEndpoint(jsonQuery)
      return data
    }

    const memoizeeOptions = {
      maxAge: apiConfig.maxAge,
      normalizer: (args: any) => JSON.stringify(args[0]),
    }

    endpoint.raw = rawEndpoint
    endpoint.memo = memoizee(endpoint, memoizeeOptions)
    endpoint.memoRaw = memoizee(rawEndpoint, memoizeeOptions)

    return endpoint
  }
