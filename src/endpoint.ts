import { GraphQLClient } from 'graphql-request'
import memoizee from 'memoizee'
import { jsonToGraphQLQuery } from './jsonToGraphQLQuery'
import { Projection } from './types'

type RawEndpoint<I, O> = <S extends I>(
  jsonQuery?: S
) => Promise<{ data: Projection<S, O>; errors: any[]; warnings: any[]; headers: any; status: any }>

export const getApiEndpointCreator = ({ getClient, typesTree, maxAge }: { getClient: () => GraphQLClient; typesTree: any; maxAge: number }) =>
  function<I, O>(
    kind: 'mutation' | 'query',
    name: string
  ): (<S extends I>(jsonQuery?: S) => Promise<Projection<S, O>>) & {
    memo: <S extends I>(jsonQuery?: S) => Promise<Projection<S, O>>
    memoRaw: RawEndpoint<I, O>
    raw: RawEndpoint<I, O>
  } {
    const rawEndpoint: any = async <S extends I>(
      jsonQuery?: S
    ): Promise<{ data: Projection<S, O>; errors: any[]; warnings: any[]; headers: any; status: any }> => {
      const { query, variables } = jsonToGraphQLQuery({ kind, name, jsonQuery, typesTree })
      const { data, errors, warnings, headers, status } = (await getClient().rawRequest(query, variables)) as any
      return { data: data[name], errors, warnings, headers, status }
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
