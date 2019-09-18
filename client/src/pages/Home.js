import React from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";

import { useAuthContext } from "../utils/authContext";
import { useRouter } from "../utils/routerContext";

import Rooms from "../components/Rooms";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerticalBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1rem;
  border-left: 1px dotted;
`;

function Home() {
  const { userState } = useAuthContext();
  const { history } = useRouter();

  return (
    <Box>
      <Rooms userState={userState} />
      <VerticalBox>
        <Button
          type="submit"
          appearance="primary"
          onClick={() => history.push("payment/accept")}
        >
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
