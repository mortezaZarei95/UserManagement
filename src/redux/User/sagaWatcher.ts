import { takeEvery } from "redux-saga/effects";

import * as sagas from "./sagas";
import {
  editCurrentUser,
  getCurrentUser,
  getUserList,
  saveCurrentUser,
  saveUserList,
} from "./slice";

export default function* sagaWatcher() {
  yield takeEvery(getUserList.type, sagas.getUserListSaga);
  yield takeEvery(saveUserList.type, sagas.saveUserListSaga);
  yield takeEvery(getCurrentUser.type, sagas.getCurrentUserSaga);
  yield takeEvery(saveCurrentUser.type, sagas.saveCurrentUserSaga);
  yield takeEvery(editCurrentUser.type, sagas.editCurrentUserSaga);
}
