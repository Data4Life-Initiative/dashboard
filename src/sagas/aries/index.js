import { call, put, takeLatest, all } from "redux-saga/effects";
import { ariesActionTypes } from "../../actions_types";
import { getSchemaFromAries ,getSchemaDetailFromAries, sendOffer} from "../../apis";

function* GetSchemaFromAries(action) {
  try {
    const responseData = yield call(getSchemaFromAries, action.payload);

    yield put({
      type: ariesActionTypes.saveSchemaFromAries,
      value: responseData.data.schema_ids || [{ error: responseData.data.data }],
    });
  } catch (ex) {
    yield put({
      type: ariesActionTypes.getSchemaFromAriesFailure,
      value: ex.response,
    });
    console.log(ex.response);
  }
}

export function* getSchemaFromAriesAction() {
  yield takeLatest(ariesActionTypes.getSchemaFromAries, GetSchemaFromAries);
}

function* GetSchemaDetailFromAries(action) {
  try {
    const responseData = yield call(getSchemaDetailFromAries, action.payload);

    yield put({
      type: ariesActionTypes.saveSchemaDetailFromAries,
      value: responseData.data.schema || [{ error: responseData.data }],
    });
  } catch (ex) {
    yield put({
      type: ariesActionTypes.getSchemaDetailFromAriesFailure,
      value: ex.response,
    });
    console.log(ex.response);
  }
}

export function* getSchemaDetailFromAriesAction() {
  yield takeLatest(ariesActionTypes.getSchemaDetailFromAries, GetSchemaDetailFromAries);
}

function* SendOffer(action) {
  try {
    const responseData = yield call(sendOffer, action.payload);

    yield put({
      type: ariesActionTypes.sendOfferSuccess,
      value: responseData.data || [{ error: responseData.data }],
    });
  } catch (ex) {
    yield put({
      type: ariesActionTypes.sendOfferFailure,
      value: ex.response,
    });
    console.log(ex.response);
  }
}

export function* sendOfferAction() {
  yield takeLatest(ariesActionTypes.sendOffer, SendOffer);
}

export default function* ariesSaga() {
  yield all([getSchemaFromAriesAction(), getSchemaDetailFromAriesAction(), sendOfferAction()]);
}
