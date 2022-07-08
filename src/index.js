import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalTheme } from "./styles/globalStyle";
import store from "./store/index";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient.config";
import { AlertProvider } from "./shared/Alert";

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
