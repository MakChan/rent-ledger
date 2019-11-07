import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormFooter, ErrorMessage } from "@atlaskit/form";

import ThemedButton from "../components/ThemedButton";
import LinkButton from "../components/LinkButton";

import { useAuthContext } from "../utils/authContext";
import { LOG_IN } from "../utils/mutations";

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
    <Form onSubmit={data => logIn({ variables: data })}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="username" label="Username" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <TextField autoComplete="off" {...fieldProps} />
            )}
          </Field>
          <Field
            name="password"
            label="Password"
            defaultValue=""
            isRequired
            validate={value => (value.length < 8 ? "TOO_SHORT" : undefined)}
          >
            {({ fieldProps, error, valid }) => (
              <>
                <TextField type="password" autoComplete="off" {...fieldProps} />
                {error && <ErrorMessage>Password too short!</ErrorMessage>}
              </>
            )}
          </Field>

          {requestError && (
            <ErrorMessage>
              Username/Password wrong. Please try again!
            </ErrorMessage>
          )}

          <FormFooter>
            <LinkButton appearance="subtle" href="/register">
              Register
            </LinkButton>
            <ThemedButton
              type="submit"
              appearance="primary"
              isLoading={requestLoading}
            >
              Login
            </ThemedButton>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default SignIn;
