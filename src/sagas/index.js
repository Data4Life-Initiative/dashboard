import { all } from "redux-saga/effects";
import newsSaga from "./news";
import loginSaga from "./login";
import userSaga from "./user";

export default function* rootSaga(getState) {
  yield all([newsSaga(), loginSaga(), userSaga()]);
}
