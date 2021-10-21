import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5000/api/graphql',
})

// Cache implementation
const cache = new InMemoryCache()  

// Create the apollo client
export const apollo = new ApolloClient({
  link: httpLink,
  cache,
})
