import { combineReducers } from "redux";
import NewsReducer from "./news";
import LoginReducer from "./login";
import UserProfileReducer from "./user_profile";
import DashboardReducer from "./dashboard";
import MapReducer from "./map";
import PatientReducer from "./patient";
import AriesReducer from "./aries";

const dataReducers = combineReducers({
  news: NewsReducer,
  auth: LoginReducer,
  user: UserProfileReducer,
  dashboard: DashboardReducer,
  map: MapReducer,
  patient: PatientReducer,
  aries: AriesReducer
});
export default dataReducers;
