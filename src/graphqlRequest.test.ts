import { graphqlRequest } from './graphqlRequest'

describe('GraphQLRequest', () => {
  it('Should retry as many times as configured properly running a "before" hook', async () => {
    let retryCount = 0
    const maxRetrials = 2
    const mockedAxios = {
      post: async () => ({
        status: retryCount < maxRetrials ? 500 : 200,
      }),
    } as any

    const result = await graphqlRequest({
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
    })

    expect(retryCount).toBe(2)
    expect(result.status).toBe(200)
  })
})
