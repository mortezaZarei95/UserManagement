import { IUser } from "types";
import classes from "./CheckUserCard.module.scss";
import defaultAvatar from "assets/icons/defaultAvatar.svg";

interface Iprops {
  label?: string;
  value: string | undefined;
  currentUser: IUser | null;
  name: string;
  onReject: (name: string) => void;
  onAccept: (name: string) => void;
  isProfilePic: boolean;
}

const CheckUserCard = (props: Iprops) => {
  return (
    <li className={classes.cardWrapper}>
      <div className={classes.labelWrapper}>
        <span>{props.label}</span>
        {props.isProfilePic ? (
          <img
            src={props.value ? props.value : defaultAvatar}
            className={classes.avatar}
            alt="user avatar"
          />
        ) : (
          <p>
            {props.label === "Birth date:"
              ? new Date(props.value as any).toLocaleDateString()
              : props.value}
          </p>
        )}
      </div>
      <div className={classes.btnWrapper}>
        <button
          className={classes.rejectBTN}
          onClick={() => props.onReject(props.name)}
        >
          <span className={classes.checkmark}></span>
        </button>
        <button
          className={classes.acceptBTN}
          onClick={() => props.onAccept(props.name)}
        >
          <span className={classes.checkmark}></span>
        </button>
      </div>
    </li>
  );
};

export default CheckUserCard;
