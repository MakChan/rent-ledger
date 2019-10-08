import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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
import { useRouter } from "../utils/routerContext";
import { CREATE_USER } from "../utils/mutations";

const SignUp = () => {
  const { setUser } = useAuthContext();
  const { history } = useRouter();

  const [createUser, {}] = useMutation(CREATE_USER, {
    onCompleted: data => {
      setUser(data.createUser);
      history.push("/");
    }
  });

  return (
    <Form onSubmit={data => createUser({ variables: data })}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
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

          <FormFooter>
            <ButtonGroup>
              <LinkButton href="/login" appearance="subtle">
                Login
              </LinkButton>
              <ThemedButton
                type="submit"
                appearance="primary"
                isLoading={submitting}
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