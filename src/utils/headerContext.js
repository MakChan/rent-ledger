import React, { useState, useContext } from "react";
import { isMobile } from ".";

export const HeaderContext = React.createContext({
  showSidebar: true,
  toggleSidebar: () => {}
});

export const HeaderProvider = props => {
  const [showSidebar, toggleSidebar] = useState(!isMobile);

  // const resize = () => {
  //   console.log("resize", window.innerWidth, showSidebar); // TODO: remove this
  //   // if (window.innerWidth <= 760 && !showSidebar) toggleSidebar(true);
  //   // else if (showSidebar) toggleSidebar(false);

  //   if (window.innerWidth <= 760 && showSidebar == true) {
  //     console.log('true'); // TODO: remove this
  //     toggleSidebar(false);
  //   } else if (!showSidebar) {
  //     console.log('false'); // TODO: remove this
  //     toggleSidebar(true);
  //   }
  // };

  // useEffect(() => {
  //   resize();
  //   window.addEventListener("resize", resize);

  //   return function() {
  //     window.removeEventListener("resize", resize);
  //   };
  // }, []);

  return (
    <HeaderContext.Provider
      value={{
        showSidebar,
        toggleSidebar
      }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
