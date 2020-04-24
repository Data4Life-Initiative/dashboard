import { call, put, takeLatest, all } from "redux-saga/effects";
import { dashboardActionTypes } from "../../actions_types";
import { getHotspotData } from "../../apis";
import get from "lodash.get";
function* getDashboardStats(action) {
  try {
    const responseData = yield call(getHotspotData, action.payload);

    yield put({
      type: dashboardActionTypes.hotspotDataReceived,
      json: get(responseData, `data.data.disease_hotspots`) || [
        { error: responseData },
      ],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* getDashboardStatsAction() {
  yield takeLatest(dashboardActionTypes.getHotspotData, getDashboardStats);
}

function* postAddLocation(action) {
  try {
    yield put({
      type: dashboardActionTypes.locationAddedSucessfully,
      json: action.payload,
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* postAddLocationAction() {
  yield takeLatest(dashboardActionTypes.addLocation, postAddLocation);
}

export default function* mapSaga() {
  yield all([getDashboardStatsAction(), postAddLocationAction()]);
}
