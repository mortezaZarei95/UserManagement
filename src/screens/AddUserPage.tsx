import AddUser from "components/screens/AddUserPage";
import { useNavigate } from "react-router";
import { useAppDispatch } from "redux/hooks";
import { saveCurrentUser } from "redux/User/slice";
import { IFormValues } from "types";

const AddUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: IFormValues) => {
    console.log(data);
    dispatch(saveCurrentUser({ ...data, checked: { list: [], state: false } }));
    navigate("/");
  };
  return <AddUser onSubmit={onSubmit} />;
};

export default AddUserPage;
