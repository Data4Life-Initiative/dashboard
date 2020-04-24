import { call, put, takeLatest, all } from "redux-saga/effects";
import { dashboardActionTypes } from "../../actions_types";
import { getDashboardStats } from "../../apis";
import get from "lodash.get";

function* getDashboardStat(action) {
  try {
    const responseData = yield call(getDashboardStats, action.payload);

    yield put({
      type: dashboardActionTypes.dashbordStatsReceived,
      json: get(responseData, `data.data`) || [{ error: responseData }],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* getDashboardStatsAction() {
  yield takeLatest(dashboardActionTypes.getDataBoard, getDashboardStat);
}

export default function* dashboardSaga() {
  yield all([getDashboardStatsAction()]);
}
