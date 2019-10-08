import React from "react";
import styled from "styled-components";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import CrossCircleIcon from "@atlaskit/icon/glyph/cross-circle";
import InviteTeamIcon from "@atlaskit/icon/glyph/invite-team";

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
        <LinkButton
          appearance="subtle"
          href="rooms/add"
          iconBefore={<AddCircleIcon primaryColor="#000" />}
        >
          Add Rooms
        </LinkButton>
        <LinkButton
          appearance="primary"
          href="payment/accept"
          iconBefore={
            <AddCircleIcon primaryColor="#fff" secondaryColor="#673ab7" />
          }
        >
          Accept Payment
        </LinkButton>
        <LinkButton
          appearance="subtle"
          href="tenants/add"
          iconBefore={<InviteTeamIcon primaryColor="#000" />}
        >
          Add Tenant
        </LinkButton>
        <LinkButton
          appearance="subtle"
          href="lease/end"
          iconBefore={<CrossCircleIcon primaryColor="#000" />}
        >
          End Lease
        </LinkButton>
      </VerticalBox>
    </Box>
  );
}

export default Home;
