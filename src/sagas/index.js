import { all } from "redux-saga/effects";
import newsSaga from "./news";
import loginSaga from "./login";
import userSaga from "./user";
import mapSaga from "./map";
import dashboardSaga from "./dashboard";
import patientSaga from "./patient";
import ariesSaga from "./aries";

export default function* rootSaga(getState) {
  yield all([
    newsSaga(),
    loginSaga(),
    userSaga(),
    mapSaga(),
    dashboardSaga(),
    patientSaga(),
    ariesSaga(),
  ]);
}
