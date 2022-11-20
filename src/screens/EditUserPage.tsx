import { useNavigate, useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  editCurrentUser,
  getCurrentUser,
  setCurrentUser,
} from "redux/User/slice";
import { IFormValues } from "types";
import EditUser from "components/screens/EditUserPage";
import { useEffect } from "react";

const EditUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const currentUser = useAppSelector((state) => state.User.currentUser);

  let initValue: IFormValues = {
    fName: currentUser ? currentUser.fName : "",
    lName: currentUser ? currentUser.lName : "",
    id: currentUser ? currentUser.id : "",
    mobileNumber: currentUser?.mobileNumber ? currentUser.mobileNumber : "",
    address: currentUser?.address ? currentUser.address : "",
    birthDate: currentUser ? currentUser.birthDate : new Date().getTime(),
    avatar: currentUser ? currentUser.avatar : "",
  };
  useEffect(() => {
    if (currentUser?.id.toString() !== params.id)
      dispatch(getCurrentUser(params.id));
  }, [params.id]);

  const onSubmit = (data: IFormValues) => {
    let newCurrentUser = {
      oldID: params.id,
      ...data,
      checked: { list: [], state: false },
    };
    console.log(newCurrentUser, "EditUserPage");

    dispatch(editCurrentUser({ ...newCurrentUser }));
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  if (currentUser?.id.toString() === params.id)
    return <EditUser onSubmit={onSubmit} initValue={initValue} />;
  return null;
};

export default EditUserPage;
