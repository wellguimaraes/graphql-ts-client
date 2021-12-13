import _axios, { AxiosStatic } from 'axios'
import { ClientConfig, GraphQLClientError } from './types'

export async function graphqlRequest({
  axios = _axios,
  queryName,
  client,
  query,
  variables,
}: {
  axios?: AxiosStatic
  client: ClientConfig
  queryName: string
  query: string
  variables: { [_key: string]: any }
}) {
  let lastResponse: {
    data: any
    errors: { message: string }[]
    warnings: any[]
    headers: any
    status?: number
  }

  for (let trial = 0; trial <= client.retryConfig.max; trial++) {
    const infoParams = {
      _q: queryName,
      ...(trial > 0 ? { _retrial: trial + 1 } : {}),
    }

    const {
      data: responseData = {} as any,
      headers,
      status,
    } = await axios.post(
      client.url,
      { query, variables },
      {
        params: infoParams,
        headers: {
          'Content-Type': 'application/json',
          ...client.headers,
        },
        validateStatus: () => true,
      }
    )

    let { data, errors, warnings } = responseData

    if (status >= 400 && !errors?.length) {
      errors = [{ message: `Request "${queryName}" failed with status ${status}` }]
    }

    lastResponse = {
      errors,
      data,
      warnings,
      headers,
      status,
    }

    if (!errors?.length) {
      break
    } else if (trial < client.retryConfig.max && typeof client.retryConfig?.before === 'function') {
      await client.retryConfig?.before({
        queryName,
        query,
        variables,
        response: lastResponse,
      })
    }
  }

  if (lastResponse!.errors && lastResponse!.errors?.length) {
    throw new GraphQLClientError(lastResponse!.errors)
  }

  return lastResponse!
}
