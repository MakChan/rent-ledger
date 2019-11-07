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

const initialState = { user: undefined, loaded: false };

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
      setUserState({ user: me });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    if (token && token !== "undefined") {
      setUserState({
        loaded: true,
        user: JSON.parse(localStorage.getItem("user"))
      });
    } else {
      setUserState({
        loaded: true
      });
    }
  }, []);

  const setUser = data => {
    localStorage.setItem("x-token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserState({ user: data.user, loaded: true });
  };

  const logOut = () => {
    localStorage.removeItem("x-token");
    localStorage.removeItem("user");
    setUserState({ user: undefined, loaded: true });
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
