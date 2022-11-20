import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";

import SaveBackBTN from "components/common/SaveBackBTN";
import { IFormValues } from "types";
import { labelList } from "util/helpers";
import classes from "./UserForm.module.scss";
import uploadIcon from "assets/icons/upload.svg";
import { getBase64 } from "util/helpers";

interface Iprops {
  onSubmit: SubmitHandler<IFormValues>;
  initValue?: IFormValues | undefined;
}

const schema = yup
  .object({
    fName: yup
      .string()
      .required("this field is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lName: yup
      .string()
      .required("this field is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    mobileNumber: yup
      .string()
      .required("this field is required")
      .matches(/^(\+98|0)?9\d{9}$/, "incorrect mobile number"),
    id: yup
      .string()
      .required("this field is required")
      .matches(/[0-9]/, "Only numbers are allowed for this field"),
    address: yup.string().required("this field is required"),
    birthDate: yup.string(),
  })
  .required();

const UserForm = (props: Iprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    defaultValues: {
      ...props.initValue,
    },
  });

  const [birthDate, setbirthDate] = useState<number>(
    props.initValue ? props.initValue?.birthDate : new Date().getTime()
  );
  console.log(
    props.initValue ? props.initValue?.birthDate : null,
    "init date",
    new Date(birthDate),
    new Date().getTime()
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      getBase64(e.target.files[0]).then((data) => {
        if (imageRef.current) {
          imageRef.current.src = `${data}`;
        }
      });
    }
  };

  const onImageClick = () => {
    inputRef.current?.click();
  };
  const onSubmit = async (data: IFormValues) => {
    console.log(
      data,
      { errors },
      !!inputRef.current?.files?.length || !!data.avatar
    );

    console.log({ ...data }, "onsubmit");
    if (!!inputRef.current?.files?.length || !!data.avatar) {
      let avatar = !!inputRef.current?.files?.length
        ? await getBase64(inputRef.current?.files[0])
        : data.avatar;

      props.onSubmit({ ...data, birthDate: birthDate, avatar });
    }
  };

  const onChangeDate = (value: DateObject) => {
    console.log(value.toDate().getTime(), "onChangeDate");

    setbirthDate(value.toDate().getTime());
  };

  const renderInputs = (name: string, label: string) => {
    return (
      <div className={classes.inputWrapper} key={name}>
        <label htmlFor={name}>{label}</label>
        <input id={name} type="text" {...register(name as any)} />
        <p className={classes.ErrText}>
          {errors[name as keyof typeof errors]?.message}
        </p>
      </div>
    );
  };

  const renderuploader = (name: string, label: string) => {
    return (
      <div className={classes.inputWrapper} key={name}>
        <label className={classes.fileLabel} htmlFor={name}>
          <p>{label}</p>
        </label>
        <img
          ref={imageRef}
          onClick={onImageClick}
          src={props.initValue?.avatar ? props.initValue.avatar : uploadIcon}
          alt="upload"
        />

        <input
          id={name}
          {...register(name as any)}
          ref={inputRef}
          type="file"
          onChange={uploadImage}
        />
      </div>
    );
  };
  const renderDatePicker = (name: string, label: string) => {
    return (
      <div
        className={[classes.inputWrapper, classes.datePickerWrapper].join(" ")}
        key={name}
      >
        <label htmlFor={name}>{label}</label>
        <DatePicker
          id={name}
          value={props.initValue?.birthDate ? new Date(birthDate) : null}
          onChange={onChangeDate}
          required
        />
      </div>
    );
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {labelList.map((item) => {
        if (Object.keys(item)[0] === "avatar") {
          return renderuploader(Object.keys(item)[0], Object.values(item)[0]);
        } else if (Object.keys(item)[0] === "birthDate") {
          return renderDatePicker(Object.keys(item)[0], Object.values(item)[0]);
        } else {
          return renderInputs(Object.keys(item)[0], Object.values(item)[0]);
        }
      })}
      <SaveBackBTN />
    </form>
  );
};

export default UserForm;
