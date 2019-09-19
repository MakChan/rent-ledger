import React from "react";
import styled from "styled-components";
import HomeIcon from "@atlaskit/icon/glyph/home";

import { useRouter } from "../utils/routerContext";
import Button from "../components/ThemedButton";

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

const Navbar = props => {
  const { history } = useRouter();
  return (
    <div>
      <Nav>
        <Button
          onClick={() => history.push("/")}
          iconBefore={<HomeIcon size="medium" />}
        />
        <Box>
          <span>
            Hi, <b>{props.user && props.user.landlord.name}</b>
          </span>
          <Button onClick={props.logOut} appearance="link">
            Logout
          </Button>
        </Box>
      </Nav>
    </div>
  );
};

export default Navbar;
