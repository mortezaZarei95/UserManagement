import { useEffect, useRef } from "react";

import SearchBox from "components/common/SearchBox";
import UserList from "components/screens/UserListPage/UserList";
import { useAppDispatch } from "redux/hooks";
import { getUserList, setSearchValue } from "redux/User/slice";
import AddUserBTN from "components/screens/UserListPage/AddUserBTN";

const UserListPage = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserList());
  });
  const onChange = () => {
    if (!!searchInputRef.current?.value) {
      dispatch(setSearchValue(searchInputRef.current.value.trim()));
    } else {
      dispatch(setSearchValue(""));
    }
  };

  return (
    <section>
      <SearchBox
        placeholder="جستجوی نام فرد"
        ref={searchInputRef}
        onChange={onChange}
      />
      <UserList />
      <footer>
        <AddUserBTN />
      </footer>
    </section>
  );
};

export default UserListPage;
