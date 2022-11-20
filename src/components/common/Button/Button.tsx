import React from "react";

import classes from "./Button.module.scss";
import { IButtonProps } from "types";

interface Iprops extends IButtonProps {
  theme?: "errTheme";
}
const Button: React.FC<Iprops> = (props) => {
  return (
    <button
      {...props}
      className={[
        classes.Button,
        props.theme === "errTheme" ? classes.errTheme : null,
      ].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
