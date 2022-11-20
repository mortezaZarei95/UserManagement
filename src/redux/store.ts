import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import commonReducer from "./Common/slice";
import userReducer from "./User/slice";

import userSagaWatcher from "./User/sagaWatcher";

const rootReducer = {
  Common: commonReducer,
  User: userReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(userSagaWatcher);

export default store;

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
