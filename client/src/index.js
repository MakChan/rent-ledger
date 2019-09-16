import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { UserProvider } from "./utils/authContext";
import { HookedBrowserRouter } from "./utils/routerContext";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  headers: {
    "x-token": localStorage.getItem("x-token")
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <HookedBrowserRouter>
        <App />
      </HookedBrowserRouter>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
