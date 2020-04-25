import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

import { logger } from "redux-logger";
import dataReducers from "../reducers";
import rootSaga from "../sagas";
import { connectRouter, routerMiddleware } from "connected-react-router";
export default function configureStore() {
  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }
  const rootReducer = combineReducers({
    data: dataReducers,
    router: connectRouter(history),
  });
  let store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware, logger), ...enhancers)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
