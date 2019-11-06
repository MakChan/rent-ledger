import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, {
  Field,
  FormFooter,
  ErrorMessage,
} from "@atlaskit/form";

import ThemedButton from "../components/ThemedButton"
import LinkButton from "../components/LinkButton"

import { useAuthContext } from "../utils/authContext";
import { LOG_IN } from "../utils/mutations";


const SignIn = () => {
  const { setUser, userState } = useAuthContext();
  const history = useHistory();

  const [logIn, {}] = useMutation(LOG_IN, {
    onCompleted: data => {
      setUser(data.logIn);
      history.push("/");
    }
  });

  useEffect(() => {
    if (userState.user) history.push("/");
  }, [userState.user]);

  return (
    <Form onSubmit={data => logIn({ variables: data })}>
      {({ formProps, submitting }) => (
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
                {error && <ErrorMessage>Wrong Password</ErrorMessage>}
              </>
            )}
          </Field>

          <FormFooter>
            <ButtonGroup>
              <LinkButton
                href="/register"
                appearance="subtle"
              >
                Register
              </LinkButton>
              <ThemedButton type="submit" appearance="primary" isLoading={submitting}>
                Login
              </ThemedButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default SignIn;
