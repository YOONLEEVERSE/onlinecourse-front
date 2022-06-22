import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalTheme } from "./globalStyle";
import store from "./store/index";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient.config";
import { AlertProvider } from "./shared/Alert";

//import { WebSocketLink } from "@apollo/client/link/ws";
//bottom. for the subscriptions apollo client에서 추천하는 최신버전. 근데 서버에서 apollo-server말고 다른 거 써서 거기 버전에 맞게 수정했음.
//import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
//import { getMainDefinition } from "@apollo/client/utilities";
//import { createClient } from "graphql-ws";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <Provider store={store}>
        <AlertProvider>
          <App />
          <GlobalTheme />
        </AlertProvider>
      </Provider>
    </Router>
  </ApolloProvider>
);
