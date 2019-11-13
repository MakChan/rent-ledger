import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";

import SignInForm from "../SignInForm";

test("submits username and password", () => {
  const username = "username";
  const password = "password";
  const onSubmit = jest.fn();
  const wrapper = mount(
    <Router>
      <SignInForm logIn={onSubmit} />
    </Router>
  );

  wrapper
    .find('input[name="username"]')
    .simulate("change", { target: { value: username } });

  wrapper
    .find('input[name="password"]')
    .simulate("change", { target: { value: password } });

  wrapper.update();
  wrapper.find('form[name="loginForm"]').simulate("submit", {
    preventDefault: () => {}
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    variables: {
      username,
      password
    }
  });
});
