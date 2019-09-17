import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import Spinner from "@atlaskit/spinner";

import Home from "./pages/Home";
import AddTenant from "./pages/AddTenant";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";

import { useAuthContext } from "./utils/authContext";
import { useRouter } from "./utils/routerContext";

import Header from "./components/Header";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

function App() {
  const { userState } = useAuthContext();

  if (!userState.loaded) return <Spinner size="medium" />;

  return (
    <Container>
      <Header user={userState.user} />
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />

        <AuthRoute path="/" exact component={Home} />
        <AuthRoute path="/tenants/add" exact component={AddTenant} />

        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
}

const AuthRoute = ({ component: Component, ...rest }) => {
  const { userState } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        !userState.user ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <main>
            <Component {...props} />
          </main>
        )
      }
    />
  );
};

export default App;
