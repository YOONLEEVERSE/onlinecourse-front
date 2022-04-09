import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalTheme } from "./globalStyle";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
//bottom. for the subscriptions
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { WebSocketLink } from "@apollo/client/link/ws";
//import { createClient } from "graphql-ws";

const container = document.getElementById("root");
const root = createRoot(container);

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://192.168.219.110:443/subscriptions",
//   })
// ); //for the subscriptions. 계속 연결돼있는 서버
const wsLink = new WebSocketLink({
  uri: "ws://192.168.219.110:8080/subscriptions",
});
const httpLink = createHttpLink({
  uri: "http://192.168.219.110:8080/graphql",
  credentials: "same-origin",
}); //for the mutation and query. 한번 연결하고 데이터 주고 받고 끊고,, mutation과 query는 굳이 websocket이 필요X

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

const splitLink = split(
  (operation) => operation.operationName === "TimeWatch",
  wsLink,
  httpLink
);
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <App />
      <GlobalTheme />
    </Router>
  </ApolloProvider>
);
