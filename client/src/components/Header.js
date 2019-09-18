import React from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";
import HomeIcon from "@atlaskit/icon/glyph/home";

import { useRouter } from "../utils/routerContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #c4a3ff;
`;

const Navbar = props => {
  const { history } = useRouter();
  return (
    <div>
      <Nav>
        <div>
          <Button onClick={() => history.push("/")} iconBefore={<HomeIcon size="medium" />} />
        </div>
        <div>
          <span>Hi, {props.user && props.user.landlord.name}</span>
          <Button onClick={props.logOut} appearance="link">
            Logout
          </Button>
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
