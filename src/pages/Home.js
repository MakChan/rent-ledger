import React from "react";
import styled from "styled-components";

import { useAuthContext } from "../utils/authContext";

import Rooms from "../components/Rooms";
import LinkButton from "../components/LinkButton";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerticalBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1rem;
`;

function Home() {
  const { userState } = useAuthContext();

  return (
    <Box>
      <Rooms userState={userState} />
      <VerticalBox>
        <LinkButton appearance="primary" href="payment/accept">
          Accept Payment
        </LinkButton>
        <LinkButton appearance="subtle" href="tenants/add">
          Add Tenant
        </LinkButton>
        <LinkButton appearance="subtle" href="#">
          End Lease
        </LinkButton>
      </VerticalBox>
    </Box>
  );
}

export default Home;
