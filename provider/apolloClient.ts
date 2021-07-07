import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
