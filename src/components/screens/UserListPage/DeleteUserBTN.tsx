import React from "react";

import classes from "./UserList.module.scss";
import { ReactComponent as TrashIcon } from "assets/icons/trash-red.svg";
import { IButtonProps } from "types";

const DeleteUserBTN: React.FC<IButtonProps> = (props) => {
  return (
    <button
      className={classes.DeleteUserBTN}
      {...props}
      name="delete selected users"
    >
      <TrashIcon />
    </button>
  );
};

export default DeleteUserBTN;
