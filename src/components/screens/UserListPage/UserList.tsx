import { Fragment, useRef, useEffect } from "react";

import classes from "./UserList.module.scss";
import CheckBox from "components/common/CheckBox";
import SelectedUserList from "./SelectedUserList";
import NotSelectedUserList from "./NotSelectedUserList";
import DeleteUserBTN from "./DeleteUserBTN";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useState } from "react";
import { IUser } from "types";
import { saveUserList } from "redux/User/slice";

const UserList = () => {
  const checkBoxRef = useRef<HTMLInputElement>(null);

  const { userList } = useAppSelector((state) => state.User);
  const searchValue = useAppSelector((state) => state.User.searchValue);

  const [selectedUserList, setselectedUserList] = useState<IUser[]>([]);
  const [notSelectedUserList, setnotSelectedUserList] = useState<IUser[]>([]);
  const [filteredList, setfilteredList] = useState<IUser[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setnotSelectedUserList(userList);
    setfilteredList(userList);
  }, [userList]);
  useEffect(() => {
    if (searchValue === "") {
      setfilteredList(notSelectedUserList);
    } else {
      let newList: IUser[] = notSelectedUserList.filter(
        (item) => !!item.fName.toUpperCase().includes(searchValue.toUpperCase())
      );

      setfilteredList(newList);
    }
  }, [searchValue, notSelectedUserList]);

  const onAllSelect = () => {
    if (checkBoxRef.current?.checked) {
      setselectedUserList(userList);
      setnotSelectedUserList([]);
    } else {
      setselectedUserList([]);
      setnotSelectedUserList(userList);
    }
  };

  const onDelete = () => {
    dispatch(saveUserList(notSelectedUserList));
    setselectedUserList([]);
  };

  const setSelectedList = (user: IUser, selected: boolean | undefined) => {
    if (selected) {
      let notSelectedList = notSelectedUserList.filter((item) => {
        return item.id !== user.id;
      });

      setselectedUserList([...selectedUserList, user]);

      setnotSelectedUserList(notSelectedList);
    } else {
      let selectedList = selectedUserList.filter((item) => {
        return item.id !== user.id;
      });

      setselectedUserList(selectedList);

      setnotSelectedUserList([user, ...notSelectedUserList]);
    }
  };

  return (
    <Fragment>
      <div className={classes.Header}>
        <CheckBox
          wrapperclassname={classes.checkBoxWrapper}
          label=""
          id="selectAll"
          name="selectAll"
          onChange={onAllSelect}
          ref={checkBoxRef}
          checked={selectedUserList.length === userList.length}
        />
        <DeleteUserBTN onClick={onDelete} />
      </div>
      <SelectedUserList
        userList={selectedUserList}
        setSelectedList={setSelectedList}
      />
      <NotSelectedUserList
        userList={filteredList}
        setSelectedList={setSelectedList}
      />
    </Fragment>
  );
};

export default UserList;
