import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import HomeIcon from "@atlaskit/icon/glyph/home";
import MenuExpandIcon from "@atlaskit/icon/glyph/menu-expand";

import { useHeaderContext } from "../utils/headerContext";
import Button from "../components/ThemedButton";

import { isMobile } from "../utils";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #c4a3ff;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Header = props => {
  const history = useHistory();
  const { showSidebar, toggleSidebar } = useHeaderContext();
  return (
    <header>
      <Nav>
        <div>
          <Button
            onClick={() => toggleSidebar(!showSidebar)}
            iconBefore={<MenuExpandIcon size="medium" />}
          />

          <Button
            onClick={() => history.push("/")}
            iconBefore={<HomeIcon size="medium" />}
          />
        </div>
        <Box>
          <span>
            Hi, <b>{props.user && props.user.landlord.name}</b>
          </span>
          {!isMobile && (
            <Button onClick={props.logOut} appearance="link">
              Logout
            </Button>
          )}
        </Box>
      </Nav>
    </header>
  );
};

export default Header;
