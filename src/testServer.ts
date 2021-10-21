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
    booksWithOptionalParams(params: BookSearchParamsAllOptional! = {}): [Book]
    booksWithRequiredParams(params: BookSearchParamsSomeRequired!): [Book]
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
    booksWithOptionalParams: (_: any, { params = {} }: { params: { title?: string; author?: string } }) => filterBooks(params),
    booksWithRequiredParams: (_: any, { params }: { params: { title: string; author?: string } }) => filterBooks(params),
  },
}

const testServer = new ApolloServer({ typeDefs, resolvers })

export const startServer = () => testServer.listen(4123).then(({ url }) => ({ url, server: testServer }))
