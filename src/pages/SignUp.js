import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";

import ThemedButton from "../components/ThemedButton";
import LinkButton from "../components/LinkButton";

import { useAuthContext } from "../utils/authContext";
import { CREATE_USER } from "../utils/mutations";

const SignUp = () => {
  const { setUser } = useAuthContext();
  const history = useHistory();

  const [
    createUser,
    { loading: requestLoading, error: requestError }
  ] = useMutation(CREATE_USER, {
    onCompleted: data => {
      setUser(data.createUser);
      history.push("/");
    }
  });

  return (
    <Form onSubmit={data => createUser({ variables: data })}>
      {({ formProps }) => (
        <form {...formProps} name="signupForm">
          <Field name="name" label="Name" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
                {!error && (
                  <HelperMessage>You can only use letters.</HelperMessage>
                )}
              </>
            )}
          </Field>
          <Field name="username" label="User name" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
                {!error && (
                  <HelperMessage>You can use letters & numbers.</HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </>
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
                <TextField type="password" {...fieldProps} />
                {!error && !valid && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    Password needs to be more than 8 characters.
                  </ErrorMessage>
                )}
                {valid && <ValidMessage>Awesome password!</ValidMessage>}
              </>
            )}
          </Field>

          {requestError && (
            <ErrorMessage>Something went wrong. Please try again!</ErrorMessage>
          )}
          <FormFooter>
            <ButtonGroup>
              <LinkButton href="/login" appearance="subtle">
                Login
              </LinkButton>
              <ThemedButton
                type="submit"
                appearance="primary"
                isLoading={requestLoading}
              >
                Register
              </ThemedButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};

export default SignUp;
