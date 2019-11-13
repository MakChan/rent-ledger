import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { useAuthContext } from "../utils/authContext";
import { LOG_IN } from "../utils/mutations";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
  const { setUser, userState } = useAuthContext();
  const history = useHistory();

  const [logIn, { loading: requestLoading, error: requestError }] = useMutation(
    LOG_IN,
    {
      onCompleted: data => {
        setUser(data.logIn);
        history.push("/");
      }
    }
  );

  useEffect(() => {
    if (userState.user) history.push("/");
  }, [userState.user]);

  return (
    <SignInForm logIn={logIn} loading={requestLoading} error={requestError} />
  );
};

export default SignIn;
