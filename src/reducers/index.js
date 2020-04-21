import { combineReducers } from "redux";
import NewsReducer from "./news";
import LoginReducer from "./login";
import UserProfileReducer from "./user_profile";

const dataReducers = combineReducers({
  news: NewsReducer,
  auth: LoginReducer,
  user: UserProfileReducer,
});
export default dataReducers;
