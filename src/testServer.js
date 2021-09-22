const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar ISODate

  type Book {
    title: String
    author: String
    dateCreated: ISODate
  }

  input BookSearchParamsAllOptional {
    title: String
    author: String
  }

  input BookSearchParamsSomeRequired {
    title: String!
    author: String
  }

  type Query {
    booksWithOptionalParams(params: BookSearchParamsAllOptional! = {}): [Book]
    booksWithRequiredParams(params: BookSearchParamsSomeRequired!): [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    booksWithOptionalParams: (params = {}) => books,
    booksWithRequiredParams: (params) => books,
  },
};

const testServer = new ApolloServer({ typeDefs, resolvers });

testServer.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
