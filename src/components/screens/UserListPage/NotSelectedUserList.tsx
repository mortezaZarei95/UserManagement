import { Fragment } from "react";

import { IUser } from "types";
import UserCard from "components/common/UserCard";

interface Iprops {
  userList: IUser[];
  setSelectedList: (user: IUser, selected: boolean | undefined) => void;
}
const NotSelectedUserList = (props: Iprops) => {
  return (
    <Fragment>
      {props.userList.map((item) => (
        <UserCard
          key={item.id}
          userInfo={item}
          onToggle={props.setSelectedList}
          selected={false}
        />
      ))}
    </Fragment>
  );
};

export default NotSelectedUserList;
