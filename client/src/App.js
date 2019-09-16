import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";

import { useAuthContext } from "./utils/authContext";

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthRoute path="/" exact component={Home} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

const AuthRoute = ({ component: Component, ...rest }) => {
  const { userState } = useAuthContext();
  return (
    <Route
      {...rest}
      render={props =>
        !userState.isLoggedIn ? (
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
