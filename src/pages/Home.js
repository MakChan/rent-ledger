import React from "react";
import styled from "styled-components";

import { useHeaderContext } from "../utils/headerContext";
import { isMobile } from "../utils";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  transition: margin 0.2s ease-in-out, transform 0.2s ease-in-out;
  margin-left: ${props => (isMobile ? "0" : props.showSidebar ? "200px" : "0")};

  transform: ${props =>
    isMobile
      ? props.showSidebar
        ? "translateX(224px)"
        : "translateX(0)"
      : ""};
`;

function Home({ children, userState, logOut }) {
  const { showSidebar } = useHeaderContext();

  return (
    <>
      <Header user={userState.user} logOut={logOut} />
      <main>
        <Sidebar showSidebar={showSidebar} logOut={logOut} />
        <Container showSidebar={showSidebar}>{children}</Container>
      </main>
    </>
  );
}

export default Home;
