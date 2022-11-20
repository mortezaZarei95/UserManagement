import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import { IUser } from "types";
import CheckBox from "../CheckBox";
import classes from "./UserCard.module.scss";
import EditIcon from "assets/icons/edit-gray.svg";
import notCheckedTag from "assets/icons/notCheckedTag.svg";
import checkedTag from "assets/icons/checkedTag.svg";
import Button from "../Button/Button";
import { useAppSelector } from "redux/hooks";
import defaultImage from "assets/icons/defaultAvatar.svg";
import { Link } from "react-router-dom";

interface Iprops {
  onToggle: (user: IUser, selected: boolean | undefined) => void;
  userInfo: IUser;
  selected: boolean;
}

const UserCard = (props: Iprops) => {
  const searchValue = useAppSelector((state) => state.User.searchValue);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const fNameTagRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const onCheck = () => {
    props.onToggle(props.userInfo, checkBoxRef.current?.checked);
  };

  useEffect(() => {
    if (!props.selected) {
      if (!!fNameTagRef.current) {
        if (
          !searchValue.length ||
          !props.userInfo.fName
            .toUpperCase()
            .includes(searchValue.toUpperCase())
        ) {
          //if user didn't search OR search isn't match => no backgroundColor
          fNameTagRef.current.style.backgroundColor = "#ffffff00";
        } else {
          fNameTagRef.current.style.backgroundColor = "#22ee4477";
        }
      }
    }
  }, [searchValue]);

  const redirectToCheckPage = () => {
    navigate(`/check-user/${props.userInfo.id}`);
  };

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.avatar}>
        <img src={props.userInfo.avatar || defaultImage} alt="" />
      </div>
      <div className={classes.userInfo}>
        <div className={classes.header}>
          <CheckBox
            ref={checkBoxRef}
            id={`${props.userInfo.id}`}
            label=""
            name=""
            wrapperclassname={classes.checkBox}
            onChange={onCheck}
            checked={props.selected}
          />

          <Link to={`/edit-user/${props.userInfo.id}`}>
            <img src={EditIcon} alt="edit" />
          </Link>
        </div>
        <ul>
          <li>
            <p>Name:</p>
            <p ref={fNameTagRef}>{props.userInfo.fName}</p>
          </li>
          <li>
            <p>Family Name:</p>
            <p>{props.userInfo.lName}</p>
          </li>
          <li>
            <p>Birth date</p>
            <p>{new Date(props.userInfo.birthDate).toLocaleDateString()}</p>
          </li>
          <li>
            <p>ID No.</p>
            <p>{props.userInfo.id}</p>
          </li>
        </ul>
        <div className={classes.userState}>
          {props.userInfo.checked.state ? (
            <img src={checkedTag} alt="checked" />
          ) : (
            <Fragment>
              <img src={notCheckedTag} alt="isnotChecked" />
              <Button
                className={classes.checkBTN}
                onClick={redirectToCheckPage}
              >
                check
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
