import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { UserProvider } from "./utils/authContext";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  headers: {
    "x-token": localStorage.getItem("x-token")
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
