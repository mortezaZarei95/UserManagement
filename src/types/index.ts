import React from "react";
export interface IFormValues {
  fName: string;
  lName: string;
  birthDate: number;
  id: number | string;
  address: string;
  mobileNumber: string;
  avatar: any;
}
export interface IUser {
  fName: string;
  lName: string;
  birthDate: number;
  id: number | string;
  address?: string;
  mobileNumber?: string;
  avatar: string;
  checked: { list: string[]; state: boolean };
}

// export type TInputProps = React.HTMLProps<HTMLInputElement>;

export type TButtonProps = React.HTMLProps<HTMLButtonElement>;

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
