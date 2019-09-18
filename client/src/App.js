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
import AcceptPayment from "./pages/AcceptPayment";

import { useAuthContext } from "./utils/authContext";
// import { useRouter } from "./utils/routerContext";

import Header from "./components/Header";
import AuthRoute from "./components/AuthRoute";

const Container = styled.div`
  max-width: 700px;
  min-height: 80vh;
  margin: 5% auto 0;
  box-shadow: 0 0px 20px #e7e7e7;
  background-color: #fbfbfb;
`;

function App() {
  const { userState } = useAuthContext();

  if (!userState.loaded) return <Spinner size="medium" />;

  return (
    <Switch>
      <AuthRoute path="/login" exact component={SignIn} title="Login" />
      <AuthRoute path="/register" exact component={SignUp} title="Register" />

      <Container>
        <GuardedRoute path="/" exact component={Home} />
        <GuardedRoute path="/tenants/add" exact component={AddTenant} />
        <GuardedRoute path="/payment/accept" exact component={AcceptPayment} />
      </Container>

      <Route component={NoMatch} />
    </Switch>
  );
}

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { userState, logOut } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        !userState.user ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <>
            <Header user={userState.user} logOut={logOut} />
            <main>
              <Component {...props} />
            </main>
          </>
        )
      }
    />
  );
};

export default App;
