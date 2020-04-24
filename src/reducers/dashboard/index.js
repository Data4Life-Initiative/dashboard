import { dashboardActionTypes } from "../../actions_types";
const initialState = {
  stats: { immune: 0, naturally_immune: 0, cured: 0 },
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardActionTypes.getDataBoard:
      return { ...state, loading: true };
    case dashboardActionTypes.dashbordStatsReceived:
      return { ...state, stats: action.json, loading: false };
    default:
      return state;
  }
};
export default DashboardReducer;
