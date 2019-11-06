import React from "react";
import styled from "styled-components";

import LinkButton from "../components/LinkButton";
import Button from "../components/ThemedButton";

import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import CrossCircleIcon from "@atlaskit/icon/glyph/cross-circle";
import InviteTeamIcon from "@atlaskit/icon/glyph/invite-team";
import SignOutIcon from "@atlaskit/icon/glyph/sign-out";

import { isMobile } from "../utils";

const Container = styled.aside`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.25rem;
  position: absolute;
  height: 100%;
  z-index: 1;
  border-right: 2px solid #c4a3ff;
  transition: transform 0.2s ease-in-out;
  transform: ${props => (props.show ? "translateX(0)" : "translateX(-100%)")};
`;

function Sidebar({ showSidebar, logOut }) {
  return (
    <Container show={showSidebar}>
      <LinkButton
        appearance="subtle"
        href="/rooms/add"
        iconBefore={<AddCircleIcon primaryColor="#000" />}
      >
        Add Rooms
      </LinkButton>
      <LinkButton
        appearance="subtle"
        href="/payment/accept"
        iconBefore={<AddCircleIcon primaryColor="#000" />}
      >
        Accept Payment
      </LinkButton>
      <LinkButton
        appearance="subtle"
        href="/tenants/add"
        iconBefore={<InviteTeamIcon primaryColor="#000" />}
      >
        Add Tenant
      </LinkButton>
      <LinkButton
        appearance="subtle"
        href="/lease/end"
        iconBefore={<CrossCircleIcon primaryColor="#000" />}
      >
        End Lease
      </LinkButton>

      {isMobile && (
        <Button
          onClick={logOut}
          //   appearance="primary"
          iconBefore={<SignOutIcon primaryColor="#000" />}
        >
          Logout
        </Button>
      )}
    </Container>
  );
}

export default Sidebar;
