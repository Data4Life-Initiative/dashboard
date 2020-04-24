import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const slice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      immune: 0,
      naturally_immune: 0,
      cured: 0,
    },
  },
  reducers: {
    update: (state, action) => {
      state.stats = action.payload;
    },
  },
});

export const selectDashboardStats = (state) =>
  state.data.dashboard ? state.data.dashboard.stats : {};

const endpoint =
  "https://mydata4life-api.igrant.io/v1/data-entry/dashboard/stats/";

export const fetchDashboardStats = () => (dispatch, getState) => {
  const { access_token } = getState().login;
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  axios.get(endpoint, config).then((res) => {
    const { data } = res ? res.data : [];
    dispatch(slice.actions.update(data));
  });
};

export default slice.reducer;
