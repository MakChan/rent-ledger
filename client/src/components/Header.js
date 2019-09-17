import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #c4a3ff;
  border: 2px solid black;
`;

const Header = props => {
  return (
    <div>
      <Nav>
        <div></div>
        <div>Hi, {props.user && props.user.landlord.name}</div>
      </Nav>
    </div>
  );
};

export default Header;
