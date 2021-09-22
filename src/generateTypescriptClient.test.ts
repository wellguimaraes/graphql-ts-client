import * as path from 'path'
import * as ts from 'typescript'
import { generateTypescriptClient } from '../src/generateTypescriptClient'

describe('generateTypescriptClient', () => {
  it('should generate working client code', async () => {
    const generatedCode = await generateTypescriptClient({
      output: path.resolve(__dirname, './testClient.ts'),
      endpoint: 'http://localhost:4000/graphql',
    })

    // TODO: create better tests to check functionality of generated code
    const client = eval(ts.transpile(generatedCode, {
      target: ts.ScriptTarget.ES5
    }))

    const books = await client.queries.booksWithOptionalParams({
      title: true,
      author: true
    })

   expect(books).toHaveLength(2)
  })
})
