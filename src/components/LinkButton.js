import React from "react";
import { Link } from "react-router-dom";
import Button from "./ThemedButton";

const ButtonWithRouter = props => (
  <Button
    {...props}
    component={React.forwardRef(({ href = "", children, ...rest }, ref) => (
      <Link {...rest} to={href} innerRef={ref}>
        {children}
      </Link>
    ))}
  >
    {props.children}
  </Button>
);

export default ButtonWithRouter;
