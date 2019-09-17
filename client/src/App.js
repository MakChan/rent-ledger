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

  if (!userState.loaded) return <Spinner size="large" />;

  return (
    <Container>
      <Header user={userState.user} />
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
        <AuthGuard user={userState.user}>
          <Route path="/" exact component={Home} />
          <Route path="/tenant/add" exact component={AddTenant} />
        </AuthGuard>
        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
}
const AuthGuard = props => {
  // const { history } = useRouter();
  // useEffect(() => {
  //   console.log("AuthGuard"); // TODO: remove this
  //   if (userState.user) history.push("/login");
  // }, []);

  if (!props.user) return <Redirect to={{ pathname: "/login" }} />;
  return <main>{props.children}</main>;
};

export default App;
