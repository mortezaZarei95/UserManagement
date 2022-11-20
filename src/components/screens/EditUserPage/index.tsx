import { SubmitHandler } from "react-hook-form";
import { IFormValues } from "types";
import UserForm from "components/common/UserForm/UserForm";

interface Iprops {
  onSubmit: SubmitHandler<IFormValues>;
  initValue: IFormValues | undefined;
}
const AddUser = (props: Iprops) => {
  return (
    <section>
      <UserForm onSubmit={props.onSubmit} initValue={props.initValue} />
    </section>
  );
};

export default AddUser;
