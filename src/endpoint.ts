import memoize from 'moize'
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
      failureMode: 'loud' | 'silent',
      jsonQuery?: S
    ): Promise<{
      data: Projection<S, O>
      errors: any[]
      warnings: any[]
      headers: any
      status: any
    }> => {
      const alias = (jsonQuery as any)?.__alias ?? queryName
      const shouldRetry = (jsonQuery as any)?.__retry ?? true
      const requestHeaders = (jsonQuery as any)?.__headers ?? {}
      const { query, variables } = jsonToGraphQLQuery({ kind, queryName, jsonQuery, typesTree: apiConfig.typesTree })
      const start = +new Date()

      const logOptions = {
        kind,
        queryName: alias,
        formatGraphQL: apiConfig.formatGraphQL,
        requestHeaders,
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
          shouldRetry,
          failureMode,
          queryName: alias,
          client: apiConfig.getClient(),
          requestHeaders,
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
      const { data } = await rawEndpoint('loud', jsonQuery)
      return data
    }

    const memoizeeOptions = {
      maxAge: apiConfig.maxAge,
      isSerialized: true,
    }

    endpoint.raw = rawEndpoint.bind(null, 'silent')
    endpoint.memo = memoize(endpoint, memoizeeOptions)
    endpoint.memoRaw = memoize(endpoint.raw, memoizeeOptions)

    return endpoint
  }
