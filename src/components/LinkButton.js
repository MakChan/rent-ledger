import React from "react";
import { Link } from "react-router-dom";    
import ThemedButton from "./ThemedButton";

const ButtonWithRouter = props => (
  <ThemedButton
    {...props}
    component={React.forwardRef(({ href = "", children, ...rest }, ref) => (
      <Link {...rest} to={href} innerRef={ref}>
        {children}
      </Link>
    ))}
  >
    {props.children}
  </ThemedButton>
);

export default ButtonWithRouter;
