import { call, put, takeLatest, all } from "redux-saga/effects";
import { registrationActionTypes } from "../../actions_types";
import { userRegistration } from "../../apis";
import { message } from "antd";
function* PostUserRegistration(action) {
  try {
    const responseData = yield call(userRegistration, action.payload);

    if (responseData.data.status === 200) {
      message.success(responseData.data.data.msg);
    } else message.error(responseData.data.data.msg);

    yield put({
      type: registrationActionTypes.signUpSuccessfuly,
      value: responseData.data.msg || [{ error: responseData.data.msg }],
    });
  } catch (ex) {
    message.error(ex.response.data.data.msg);
    yield put({
      type: registrationActionTypes.signUpFailure,
      value: ex.response.data.data.msg,
    });
    console.log(ex.response);
  }
}

export function* postUserRegistrationAction() {
  yield takeLatest(registrationActionTypes.signUpStart, PostUserRegistration);
}

export default function* userSaga() {
  yield all([postUserRegistrationAction()]);
}
