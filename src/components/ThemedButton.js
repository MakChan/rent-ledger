import React from "react";
import Button from "@atlaskit/button";
import { colors } from "@atlaskit/theme";

const ThemedButton = props => (
  <Button
    theme={(currentTheme, themeProps) => {
      const { buttonStyles, ...rest } = currentTheme(themeProps);
      return {
        buttonStyles: {
          ...buttonStyles,
          ...baseStyles,
          ...extract(customTheme, themeProps)
        },
        ...rest
      };
    }}
    {...props}
  />
);

const baseStyles = {
  // border: "none",
  // padding: "0px 15px",
  // borderRadius: "2px",
  // fontWeight: "bold",
  margin: ".25rem"
};

// const transform = {
//   default: "initial",
//   active: "translateY(2px) translateX(1px)"
// };

// const transition = {
//   default:
//     "background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s",
//   active:
//     "background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s"
// };

const customTheme = {
  link: {
    padding: "10px 15px",
    margin: "20px",
    color: {
      default: { light: colors.DN400 },
      hover: "#6b46b0",
      active: "#58339b"
    }
  },
  subtle: {
    background: {
      default: colors.N30,
      active: "#eee5ff"
    },
    color: {
      hover: "#6b46b0",
      active: "#58339b"
    }
    // boxShadow: {
    //   default: `1px 2px 0 0 #dcdcdc`,
    //   hover: `1px 2px 0 0 #c0c0c0`,
    //   active: "0px 0px 0 0"
    // },
    // transform: transform,
    // transition: transition
  },
  primary: {
    background: {
      default: "#673ab7",
      hover: "#6b46b0",
      active: "#58339b"
    }
    // boxShadow: {
    //   default: `1px 2px 0 0 #b895f8`,
    //   hover: `1px 2px 0 0 #a78bda`,
    //   active: "0px 0px 0 0"
    // },
    // transform: transform,
    // transition: transition
  }
};

function extract(newTheme, appearance, state, mode) {
  if (!newTheme[appearance]) return;
  const root = newTheme[appearance];
  return Object.keys(root).reduce((acc, val) => {
    let node = root;
    [val, state, mode].forEach(item => {
      if (!node[item]) return;
      if (typeof node[item] !== "object") {
        acc[val] = node[item];
        return;
      }
      node = node[item];
      return;
    });
    return acc;
  }, {});
}

export default ThemedButton;
