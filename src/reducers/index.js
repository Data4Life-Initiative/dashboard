import { combineReducers } from "redux";
import NewsReducer from "./news";

const dataReducers = combineReducers({
  News: NewsReducer,
});
export default dataReducers;
