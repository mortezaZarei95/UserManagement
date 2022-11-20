import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitState = {
  loading: boolean;
  showAlert: boolean;
  messageAlert: string;
  typeAlert: string;
  redirectState: boolean;
  redirectURL: string;
};
type TRedirectObj = {
  url: string;
  state: boolean;
};
const initialState: TinitState = {
  loading: false,
  //Alert
  showAlert: false,
  messageAlert: "",
  typeAlert: "",
  //Redirect
  redirectState: false,
  redirectURL: "",
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setMessageAlert: (state, action: PayloadAction<string>) => {
      state.messageAlert = action.payload;
    },
    setTypeAlert: (state, action: PayloadAction<string>) => {
      state.typeAlert = action.payload;
    },

    setRedirect: (state, action: PayloadAction<TRedirectObj>) => {
      state.redirectURL = action.payload.url;
      state.redirectState = action.payload.state;
    },
    setRedirectState: (state, action: PayloadAction<boolean>) => {
      state.redirectState = action.payload;
    },
    setRedirectURL: (state, action: PayloadAction<string>) => {
      state.redirectURL = action.payload;
    },

    // and saga actions
  },
});
export const {
  setLoading,
  setShowAlert,
  setMessageAlert,
  setTypeAlert,
  setRedirect,
  setRedirectState,
  setRedirectURL,
} = commonSlice.actions; //commonState??

export default commonSlice.reducer;
