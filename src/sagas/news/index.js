import { put, takeLatest, all } from "redux-saga/effects";
import { newActionTypes } from "../../actions_types";
function* fetchNews() {
  try {
    const json = yield fetch(
      "https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc"
    ).then((response) => response.json());

    yield put({
      type: newActionTypes.newsReceived,
      json: json.articles || [{ error: json.message }],
    });
  } catch (ex) {
    console.log(ex);
  }
}

export function* actionWatcher() {
  yield takeLatest(newActionTypes.getNews, fetchNews);
}

export default function* newsSaga() {
  yield all([actionWatcher()]);
}
