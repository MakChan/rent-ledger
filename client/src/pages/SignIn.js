import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";

import { useAuthContext } from "../utils/authContext";
import { useRouter } from "../utils/routerContext";

const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
      user {
        _id
        username
        landlord {
          _id
          name
        }
      }
    }
  }
`;

const SignIn = () => {
  const { setUser, userState } = useAuthContext();
  const { history } = useRouter();

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
          <Field name="username" label="User name" isRequired defaultValue="">
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
              <Button
                onClick={() => history.push("/register")}
                appearance="subtle"
              >
                Register
              </Button>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Login
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default SignIn;
