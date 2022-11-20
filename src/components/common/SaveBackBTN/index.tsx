import { useNavigate } from "react-router";

import classes from "./SaveBackBTN.module.scss";
import Button from "../Button/Button";

interface Iprops {
  onSave?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}
const SaveBackBTN = (props: Iprops) => {
  const navigate = useNavigate();
  const goBackHistory = () => {
    navigate(-1);
  };

  return (
    <div className={classes.SaveBackWrapper}>
      <Button onClick={props.onSave} type="submit">
        save
      </Button>
      <Button onClick={goBackHistory} theme="errTheme">
        back
      </Button>
    </div>
  );
};

export default SaveBackBTN;
