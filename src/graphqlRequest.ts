import _axios, { AxiosStatic } from 'axios'
import { ClientConfig, GraphQLClientError } from './types'

const sleep = (ms = 0) =>
  new Promise<void>(resolve => {
    setTimeout(() => resolve(), ms)
  })

export async function graphqlRequest({
  shouldRetry = true,
  axios = _axios,
  queryName,
  client,
  query,
  variables,
  failureMode,
}: {
  shouldRetry?: boolean
  failureMode: 'loud' | 'silent'
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

  const maxRetrials = shouldRetry ? client.retryConfig.max : 0

  for (let trial = 0; true; trial++) {
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
    } else if (trial < maxRetrials && typeof client.retryConfig?.before === 'function') {
      await client.retryConfig?.before({
        queryName,
        query,
        variables,
        response: lastResponse,
      })

      if (client.retryConfig.waitBeforeRetry) {
        await sleep(client.retryConfig.waitBeforeRetry)
      }
    } else if (trial >= maxRetrials) {
      break
    }
  }

  if (failureMode === 'loud' && lastResponse!.errors && lastResponse!.errors?.length) {
    throw new GraphQLClientError(lastResponse!.errors)
  }

  return lastResponse!
}
