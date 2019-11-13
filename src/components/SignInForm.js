import React from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormFooter, ErrorMessage } from "@atlaskit/form";

import ThemedButton from "../components/ThemedButton";
import LinkButton from "../components/LinkButton";

function SignInForm({ logIn, loading, error }) {
  return (
    <Form onSubmit={data => logIn({ variables: data })}>
      {({ formProps }) => (
        <form {...formProps} name="loginForm">
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

          {error && (
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
              isLoading={loading}
            >
              Login
            </ThemedButton>
          </FormFooter>
        </form>
      )}
    </Form>
  );
}

export default SignInForm;
