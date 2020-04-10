import { configureStore } from "@reduxjs/toolkit";
import heatmapReducer from "../features/map/mapSlice";
import loginReducer from "../features/login/loginSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export default configureStore({
  reducer: {
    map: heatmapReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
  },
});
