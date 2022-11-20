import React from "react";

import classes from "./UserList.module.scss";
import { Link } from "react-router-dom";

const AddUserBTN = () => {
  return (
    <Link to="/add-user" className={classes.AddUserBTN}>
      +
    </Link>
  );
};

export default AddUserBTN;
