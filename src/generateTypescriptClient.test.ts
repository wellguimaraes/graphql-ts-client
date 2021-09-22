import * as path from 'path'
import * as ts from 'typescript'
import { generateTypescriptClient } from '../src/generateTypescriptClient'

describe('generateTypescriptClient', () => {
  it('should generate client code', async () => {
    const generatedCode = await generateTypescriptClient({
      output: path.resolve(__dirname, './testClient.ts'),
      endpoint: 'http://localhost:4000/graphql',
    })

    const client = eval(ts.transpile(generatedCode))
    const books = await client.queries.booksWithOptionalParams({
      title: true,
      author: true
    })

   expect(books).toHaveLength(2)
  })
})
