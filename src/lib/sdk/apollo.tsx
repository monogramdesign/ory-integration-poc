//import Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//Initialize Apollo Client
export const client = new ApolloClient({
  uri: "https://rt-apollo-prisma-staging.up.railway.app/",
  cache: new InMemoryCache(),
});
