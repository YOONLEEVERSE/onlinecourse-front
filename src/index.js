import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalTheme } from "./globalStyle";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "./store/index";
//import { WebSocketLink } from "@apollo/client/link/ws";
//bottom. for the subscriptions apollo client에서 추천하는 최신버전. 근데 서버에서 apollo-server말고 다른 거 써서 거기 버전에 맞게 수정했음.
//import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
//import { getMainDefinition } from "@apollo/client/utilities";
//import { createClient } from "graphql-ws";

const container = document.getElementById("root");
const root = createRoot(container);

// const wsLink = new WebSocketLink({
//   uri: "ws://192.168.219.110:8080/subscriptions",
// });
//uri: "http://180.231.130.252:8000/graphql",
//uri: "http://online-course-api.kro.kr:8000/graphql",
const httpLink = createHttpLink({
  credentials: "same-origin",
  uri: "http://192.168.219.100:8000/graphql",
}); //for the mutation and query. 한번 연결하고 데이터 주고 받고 끊고,, mutation과 query는 굳이 websocket이 필요X

//헤더에 토큰 추가
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token") || "testtoken";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const splitLink = split(
//   (operation) => operation.operationName === "TimeWatch",
//   wsLink,
//   authLink.concat(httpLink)
// );
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <Provider store={store}>
        <App />
        <GlobalTheme />
      </Provider>
    </Router>
  </ApolloProvider>
);
