import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  loginActionTypes,
  userActionTypes,
  dashboardActionTypes,
} from "../../actions_types";
import { OtpSend, verifyOtp, adminSignIn } from "../../apis";
import { push } from "react-router-redux";
function* PostOtpSend(action) {
  try {
    const { data } = yield call(OtpSend, action.payload);
    yield put({
      type: loginActionTypes.OtpReceived,
      json: data || [{ error: data.message }],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* postOtpSendAction() {
  yield takeLatest(loginActionTypes.getOtp, PostOtpSend);
}

function* postVerifyOtp(action) {
  try {
    const { data } = yield call(verifyOtp, action.payload);

    yield put({
      type: loginActionTypes.otpVerified,
      json: data || [{ error: data.message }],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* postVerifyOtpAction() {
  yield takeLatest(loginActionTypes.verifyOtp, postVerifyOtp);
}

function* postAdminSignIn(action) {
  try {
    const { data } = yield call(adminSignIn, action.payload);
    if (data.status === 200) {
      action.payload.history.push("/admin-dashboard");
    }
    yield put({
      type: loginActionTypes.adminSignInSuccessfully,
      json: { isAdminSignedIn: data.status === 200 } || [
        { error: data.message },
      ],
    });
    yield put({
      type: loginActionTypes.accessToken,
      value: (data && data.data.access_token) || [{ error: data.message }],
    });
    yield put({
      type: userActionTypes.userProfile,
      json: (data && data.data.profile) || [{ error: data.message }],
    });
    yield put({
      type: dashboardActionTypes.dashbordStatsReceived,
      json: (data && {
        currently_infected: data.data.currently_infected,
        immunized: data.data.immunized,
        naturally_immune: data.data.naturally_immune,
      }) || [{ error: data.message }],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* postAdminSignInAction() {
  yield takeLatest(loginActionTypes.adminSignIn, postAdminSignIn);
}

export default function* loginSaga() {
  yield all([
    postOtpSendAction(),
    postVerifyOtpAction(),
    postAdminSignInAction(),
  ]);
}
