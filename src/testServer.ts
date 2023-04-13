import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  scalar ISODate

  enum BookType {
    IPSUM
    DOLOR
    SIT
  }

  type Book {
    title: String
    author: String
    type: BookType
    dateCreated: ISODate
  }

  input BookSearchParamsAllOptional {
    title: String
    author: String
    createdAfter: ISODate
  }

  input BookSearchParamsSomeRequired {
    title: String!
    author: String
  }

  type Query {
    booksWithoutParams: [Book]
    booksWithOptionalParams(params: BookSearchParamsAllOptional! = {}): [Book]
    booksWithRequiredParams(params: BookSearchParamsSomeRequired!): [Book]
    failingQuery(id: String!): String
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

function filterBooks(params: { title?: string; author?: string }) {
  return books.filter(
    book => (!params.title || book.title.includes(params.title)) && (!params.author || book.author.includes(params.author))
  )
}

const resolvers = {
  Query: {
    booksWithoutParams: () => books,
    booksWithOptionalParams: (_: any, { params = {} }: { params: { title?: string; author?: string } }) => filterBooks(params),
    booksWithRequiredParams: (_: any, { params }: { params: { title: string; author?: string } }) => filterBooks(params),
    failingQuery: () => {
      throw new Error('Failed lorem ipsum dolor')
    },
  },
}

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
})

export const startServer = () => testServer.listen(4123).then(({ url }) => ({ url, server: testServer }))
