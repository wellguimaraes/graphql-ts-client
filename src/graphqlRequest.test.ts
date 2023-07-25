import { graphqlRequest } from './graphqlRequest'

describe('GraphQLRequest', () => {
  it('Should request have proper structure', async () => {
    let request: any;

    const mockedAxios = {
      post: function() {
        request = arguments
        return {
          status: 200,
        }
      },
    } as any

    const result = await graphqlRequest({
      shouldRetry: false,
      failureMode: 'loud',
      axios: mockedAxios,
      queryName: 'sampleQueryName',
      query: 'sampleQuery',
      variables: {foo:'bar',bar:'foo'},
      client: {
        url: 'https://whatever.com',
        headers: {},
        retryConfig: {
          max: 0,
          before: () => void [1],
        },
      },
    }).catch(err => err)

    expect(result.status).toBe(200)
    expect(request).toMatchSnapshot()
    expect(request).toBeDefined()
    const [url, data, config] = request
    expect(url).toEqual('https://whatever.com')
    expect(config).toBeDefined()
    expect(data.operationName).toEqual('sampleQueryName')
    expect(data.hasOwnProperty('query')).toEqual(true)
    expect(data.hasOwnProperty('variables')).toEqual(true)
  })

  it('Should retry as many times as configured properly running a "before" hook', async () => {
    let retryCount = 0
    const maxRetrials = 2
    const mockedAxios = {
      post: async () => ({
        status: retryCount < maxRetrials ? 500 : 200,
      }),
    } as any

    const result = await graphqlRequest({

      failureMode: 'loud',
      axios: mockedAxios,
      queryName: 'whatever',
      query: 'whatever',
      variables: {},
      requestHeaders: {},
      client: {
        url: 'https://whatever.com',
        headers: {},
        retryConfig: {
          max: maxRetrials,
          before: () => void [retryCount++],
        },
      },
    })

    expect(retryCount).toBe(2)
    expect(result.status).toBe(200)
  })

  it('Should ignore default retrying config explicitly asking to skip retrials ', async () => {
    let retryCount = 0
    const maxRetrials = 2
    const mockedAxios = {
      post: async () => ({
        status: retryCount < maxRetrials ? 500 : 200,
      }),
    } as any

    const result = await graphqlRequest({
      shouldRetry: false,
      failureMode: 'loud',
      axios: mockedAxios,
      queryName: 'whatever',
      query: 'whatever',
      variables: {},
      client: {
        url: 'https://whatever.com',
        headers: {},
        retryConfig: {
          max: maxRetrials,
          before: () => void [retryCount++],
        },
      },
    }).catch(err => err)

    expect(result).toBeInstanceOf(Error)
  })
})
