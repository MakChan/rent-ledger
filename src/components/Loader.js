import React from "react";
import styled from "styled-components";
import Spinner from "@atlaskit/spinner";

const Wrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Loader = props => (
  <Wrapper>
    <Spinner {...props} />
  </Wrapper>
);

export { Loader, Wrapper };
