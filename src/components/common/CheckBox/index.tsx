import React, { forwardRef } from "react";

import { IInputProps } from "types";
import classes from "./checkBox.module.scss";

interface Iprops extends IInputProps {
  wrapperclassname?: string;
  id: string;
  name: string;
  label: string;
}
const CheckBox = forwardRef<HTMLInputElement, Iprops>((props, ref) => {
  return (
    <label
      className={[props.wrapperclassname, classes.label].join(" ")}
      htmlFor={props.id}
    >
      <p>{props.label}</p>
      <input ref={ref} type="checkbox" {...props} />
      <span className={classes.checkmark}></span>
    </label>
  );
});

export default CheckBox;
