import { put } from "redux-saga/effects";

import { setLoading } from "../Common/slice";
import { IeditUserPayload, setCurrentUser, setUserList } from "./slice";
import { IUser } from "types";
import { PayloadAction } from "@reduxjs/toolkit";

// import axios from "../../axiosInstance";

export function* getUserListSaga() {
  yield put(setLoading(true));
  try {
    //insted of using Axios(calling APIs), i will get app data from localStorage
    let userList: IUser[] = JSON.parse(
      yield localStorage.getItem("userList") || ""
    );

    yield put(setUserList(userList));
  } catch (err) {
    console.error("sagaERR", err);
  } finally {
    yield put(setLoading(false));
  }
}
export function* saveUserListSaga(action: PayloadAction<IUser[]>) {
  yield put(setLoading(true));
  try {
    localStorage.setItem("userList", JSON.stringify(action.payload));

    yield put(setUserList(action.payload));
  } catch (err) {
    console.error("sagaERR", err);
  } finally {
    yield put(setLoading(false));
  }
}
export function* getCurrentUserSaga(action: PayloadAction<number>) {
  yield put(setLoading(true));
  try {
    //insted of using Axios(calling APIs), i will get app data from localStorage
    let userList: IUser[] = JSON.parse(
      yield localStorage.getItem("userList") || ""
    );
    let currentUser = userList.filter((item) => item.id === action.payload);

    yield put(setCurrentUser(currentUser[0]));
  } catch (err) {
    console.error("sagaERR", err);
  } finally {
    yield put(setLoading(false));
  }
}
export function* saveCurrentUserSaga(action: PayloadAction<IUser>) {
  yield put(setLoading(true));
  try {
    let userList: IUser[] = JSON.parse(
      yield localStorage.getItem("userList") || ""
    );
    let filteredList = userList.filter((item) => item.id !== action.payload.id);

    const newList = [...filteredList, action.payload];

    localStorage.setItem("userList", JSON.stringify(newList));

    yield put(setCurrentUser(action.payload));

    yield put(setUserList(newList));
  } catch (err) {
    console.error("sagaERR", err);
  } finally {
    yield put(setLoading(false));
  }
}

export function* editCurrentUserSaga(action: PayloadAction<IeditUserPayload>) {
  yield put(setLoading(true));
  try {
    let userList: IUser[] = JSON.parse(
      yield localStorage.getItem("userList") || ""
    );
    let filteredList = userList.filter(
      (item) => item.id !== action.payload.oldID
    );
    const newList = [...filteredList, action.payload];

    localStorage.setItem("userList", JSON.stringify(newList));

    yield put(setUserList(newList));
  } catch (err) {
    console.error("sagaERR", err);
  } finally {
    yield put(setLoading(false));
  }
}
