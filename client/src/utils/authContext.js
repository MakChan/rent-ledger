import React, { useState, useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_ME = gql`
  {
    me {
      _id
      username
      landlord {
        _id
        name
      }
    }
  }
`;

const initialState = { user: undefined, isLoggedIn: true };

export const AuthContext = React.createContext({
  userState: initialState,
  setUser: () => {},
  logOut: () => {}
});

export const UserProvider = props => {
  const [userState, setUserState] = useState(initialState);
  const [getMe, { data }] = useLazyQuery(GET_ME, {
    variables: { asfas: true },
    onCompleted({ me }) {
      console.log("onCompleted"); // TODO: remove this
      console.log("data", me);
      setUserState({ user: me });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    console.log("token ==>", token); // TODO: remove this
    if (token && token !== "undefined") {
      console.log("getMe"); // TODO: remove this
      // getMe({ variables: { asfas: true } });
      setUserState({
        isLoggedIn: true,
        user: JSON.parse(localStorage.getItem("user"))
      });
    } else {
      setUserState({
        isLoggedIn: false
      });
    }
  }, []);

  const setUser = data => {
    console.log("data ==>", data); // TODO: remove this
    localStorage.setItem("x-token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserState({ user: data.user });
  };

  const logOut = () => {
    localStorage.removeItem("x-token");
    setUserState({ user: undefined, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        setUser,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
