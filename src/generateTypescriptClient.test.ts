import { ApolloServer } from 'apollo-server'
import * as path from 'path'
import { generateTypescriptClient } from './generateTypescriptClient'
import { startServer } from './testServer'
import { GraphQLClientError } from './types'

let testServer: { server: ApolloServer; url: string }
let client: any

describe('Generated Client', () => {
  beforeAll(async () => {
    testServer = await startServer()

    const clientName = 'myApiClient'

    const { js } = await generateTypescriptClient({
      clientName,
      endpoint: `${testServer.url}/graphql`,
      // For the sake of checking the generated code, we'll
      // specify an output path
      output: path.resolve(__dirname, './@temp/testClient.ts'),
      formatGraphQL: true,
    })

    client = eval(`${js};${clientName}`)
  })

  afterAll(async () => await testServer.server.stop())

  it('should be able to make queries with optional args, not passing args obj', async () => {
    // noinspection TypeScriptValidateJSTypes
    const books = await client.queries.booksWithOptionalParams({
      title: true,
      author: true,
    })

    expect(books).toHaveLength(2)
    expect(books[0]).toHaveProperty('title')
    expect(books[0]).toHaveProperty('author')
  })

  it('should be able to make queries with optional args, not passing args obj', async () => {
    // noinspection TypeScriptValidateJSTypes
    const books = await client.queries.booksWithOptionalParams({
      __alias: 'helloWorld',
      title: true,
      author: true,
    })

    expect(books).toHaveLength(2)
    expect(books[0]).toHaveProperty('title')
    expect(books[0]).toHaveProperty('author')
  })

  it('fail with broken queries', async () => {
    const result = await client.queries.failingQuery
      .raw({
        __args: {
          id: 'hello',
        },
      })
      .then(
        () => 'success',
        (err: any) => err
      )

    expect(result).toBeInstanceOf(GraphQLClientError)
    expect(result.message).toBe('Failed lorem ipsum dolor')
  })
})
