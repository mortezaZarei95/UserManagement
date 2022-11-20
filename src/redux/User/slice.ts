import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types";

type TinitState = {
  userList: IUser[];
  currentUser: IUser | null;
  searchValue: string;
};

const initialState: TinitState = {
  userList: [],
  currentUser: null,
  searchValue: "",
};

export interface IeditUserPayload extends IUser {
  oldID: string | undefined;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserList: () => {},
    setUserList: (state, action: PayloadAction<IUser[]>) => ({
      ...state,
      userList: action.payload,
    }),
    saveUserList: (state, action: PayloadAction<IUser[]>) => {},

    getCurrentUser: (
      state,
      action: PayloadAction<number | string | undefined>
    ) => {},
    saveCurrentUser: (state, action: PayloadAction<IUser | null>) => {},

    setCurrentUser: (state, action: PayloadAction<IUser | null>) => ({
      ...state,
      currentUser: action.payload,
    }),

    setSearchValue: (state, action: PayloadAction<string>) => ({
      ...state,
      searchValue: action.payload,
    }),
    editCurrentUser: (state, action: PayloadAction<IeditUserPayload>) => {},
  },
});

export const {
  setUserList,
  getUserList,
  saveUserList,
  setSearchValue,
  getCurrentUser,
  setCurrentUser,
  saveCurrentUser,
  editCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
