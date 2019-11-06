import React, { Suspense, lazy } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import { useAuthContext } from "./utils/authContext";
import { HeaderProvider, useHeaderContext } from "./utils/headerContext";

import AuthRoute from "./components/AuthRoute";
import { Loader, Wrapper } from "./components/Loader";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const AddTenant = lazy(() => import("./pages/AddTenant"));
const AddRooms = lazy(() => import("./pages/AddRooms"));
const AcceptPayment = lazy(() => import("./pages/AcceptPayment"));
const EndLease = lazy(() => import("./pages/EndLease"));
const NoMatch = lazy(() => import("./pages/NoMatch"));

const Container = styled.div`
  max-width: 750px;
  min-height: 80vh;
  margin: auto;
  box-shadow: 0 0px 20px #e7e7e7;
  background-color: #fbfbfb;

  @media (min-width: 768px) {
    margin: 5% auto 0;
  }
`;

function App() {
  const { userState } = useAuthContext();

  if (!userState.loaded)
    return (
      <Wrapper>
        <Loader size="medium" />
      </Wrapper>
    );

  return (
    <Switch>
      <AuthRoute path="/login" exact component={SignIn} title="Login" />
      <AuthRoute path="/register" exact component={SignUp} title="Register" />

      <Container>
        <Suspense fallback={<Loader size="large" />}>
          <GuardedRoute path="/" exact component={Rooms} />
          <GuardedRoute path="/rooms/add" exact component={AddRooms} />
          <GuardedRoute path="/tenants/add" exact component={AddTenant} />
          <GuardedRoute path="/lease/end" exact component={EndLease} />
          <GuardedRoute
            path="/payment/accept"
            exact
            component={AcceptPayment}
          />
        </Suspense>
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
          <HeaderProvider>
            <Home userState={userState} logOut={logOut}>
              <Component {...props} />
            </Home>
          </HeaderProvider>
        )
      }
    />
  );
};

export default App;
