import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

const Header = styled.header`
  background-color: rgb(45, 51, 58);
  padding: 1rem;
  color: #fff;
`;

const Box = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 10% auto;
  background-color: #fbfbfb;
  box-shadow: 0 0px 20px #e7e7e7;
`;

const BoxInner = styled.div`
  padding: 2rem;
`;

const AuthRoute = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Box>
        <Header>{title}</Header>
        <BoxInner>
          <Component {...props} />
        </BoxInner>
      </Box>
    )}
  />
);

export default AuthRoute;
