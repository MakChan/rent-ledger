import React from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";

import { useAuthContext } from "../utils/authContext";
import { useRouter } from "../utils/routerContext";

import Rooms from "../components/Rooms";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
`;

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-left: 2px solid black;
`;

function Home() {
  const { userState } = useAuthContext();
  const { history } = useRouter();

  return (
    <Box>
      <Rooms userState={userState} />
      <VerticalBox>
        <Button type="submit" appearance="primary">
          Accept Payment
        </Button>
        <Button
          type="submit"
          appearance="subtle"
          onClick={() => history.push("tenants/add")}
        >
          Add Tenant
        </Button>
        <Button type="submit" appearance="subtle">
          End Lease
        </Button>
      </VerticalBox>
    </Box>
  );
}

export default Home;
