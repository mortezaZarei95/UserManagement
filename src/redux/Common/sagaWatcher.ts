import { takeEvery } from "redux-saga/effects";
import * as sagas from "./sagas";

export function* watchCommon() {
  yield takeEvery("common/getData", sagas.fetchCommonSaga);
}
