import React, { forwardRef } from "react";

import { IInputProps } from "types";
import classes from "./SearchBox.module.scss";
import { ReactComponent as SearchIcon } from "assets/icons/search-gray.svg";

const SearchBox = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <header className={classes.SearchWrapper}>
      <SearchIcon />
      <input ref={ref} type="text" {...props} />
    </header>
  );
});

export default SearchBox;
