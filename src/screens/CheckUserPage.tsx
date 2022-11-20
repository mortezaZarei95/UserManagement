import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Button from "components/common/Button/Button";
import CheckUserCard from "components/common/CheckUserCard";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getCurrentUser, saveCurrentUser } from "redux/User/slice";
import { IUser } from "types";
import { labelList } from "util/helpers";
import classes from "./Screens.module.scss";
import SaveBackBTN from "components/common/SaveBackBTN";

const CheckUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser: IUser | null = useAppSelector(
    (state) => state.User.currentUser
  );
  const params = useParams();
  let checkedItems: string[] = [];

  useEffect(() => {
    //fetch current user data
    if (!!currentUser?.id || currentUser?.id != params.id) {
      dispatch(getCurrentUser(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    //copy user checked items into checkedItems
    if (!!currentUser?.id) {
      checkedItems = [...currentUser.checked.list];
    }
  }, [currentUser]);

  const onReject = (name: string) => {
    let newCheckList = checkedItems.filter((item) => item !== name);
    checkedItems = newCheckList;
  };

  const onAccept = (name: string) => {
    const existInCheckedList = checkedItems.find((item) => item === name);
    if (!existInCheckedList) {
      let newCheckList: string[] = [...checkedItems, name];
      checkedItems = newCheckList;
    }
  };

  const onSave = () => {
    if (currentUser) {
      let checkState = checkedItems.length === labelList.length;
      let newCurrentUser = currentUser;

      newCurrentUser = {
        ...newCurrentUser,
        checked: {
          state: checkState,
          list: [...checkedItems],
        },
      };

      dispatch(saveCurrentUser(newCurrentUser));
      navigate("/");
    }
  };

  if (!!currentUser)
    return (
      <section className={classes.checkUserPageWrapper}>
        <ul>
          {labelList.map((item, index) => (
            <CheckUserCard
              key={index}
              label={Object.values(item)[0]}
              name={Object.keys(item)[0]}
              value={(currentUser as any)[Object.keys(item)[0]]}
              currentUser={currentUser}
              onAccept={onAccept}
              onReject={onReject}
              isProfilePic={Object.values(item)[0] === "Profile Pic:"}
            />
          ))}
        </ul>
        <SaveBackBTN onSave={onSave} />
      </section>
    );
  return null;
};

export default CheckUserPage;
