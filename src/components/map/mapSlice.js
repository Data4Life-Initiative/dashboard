import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as R from "rambda";

export const slice = createSlice({
  name: "map",
  initialState: {
    data: [],
    locations: [],
    show: false,
    center: {
      lat: 59.329444,
      lng: 18.068611,
    },
    zoom: 14,
    loaded: false,
  },
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload;
      state.zoom = 16;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    toggleHeatMap: (state) => {
      state.show = !state.show;
    },
    mapLoaded: (state) => {
      state.loaded = true;
    },
    addLocation: (state, action) => {
      state.data.map.locations.push(action.payload);
    },
  },
});

export const { mapLoaded, addLocation, setCenter } = slice.actions;

export const selectHeatmapData = (state) =>
  state.data.map.data ? state.data.map.data : [];
export const selectCenter = (state) =>
  state.data.map ? state.data.map.center : [];
export const selectZoom = (state) => (state.data.map ? state.data.map.zoom : 1);
export const selectMapLoaded = (state) =>
  state.data.map ? state.data.map.loaded : true;
export const selectLocations = (state) =>
  state.data.map ? state.data.map.locations : [];

export const selectInfectionStatus = (state) =>
  state.data.map ? state.data.map.infectionStatus : [];
export const selectTimeStamp = (state) =>
  state.data.map && state.data.map.timeStamp ? state.data.map.timeStamp : null;
const toLatLng = R.map((e) => ({
  lat: parseFloat(e.lat),
  lng: parseFloat(e.long),
  t: parseInt(e.timestamp),
}));
const processData = R.compose(
  // R.sortBy(R.prop('timestamp')),
  toLatLng
  // R.flatten,
);

const endpoint =
  "https://mydata4life-api.igrant.io/v1/data-entry/disease-hotspots/";
export const fetchHotspotData = () => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOiJhZG1pbiIsInJhbmQiOjAuNTQwNTI4MzkzMTYxODk3OH0._1CvDWqCAUONahmwnK6lv8KF_tXnvxIyz-JVXgVuArs`,
    },
  };
  axios.get(endpoint, config).then((res) => {
    const data = processData(res.data.data.disease_hotspots);
    dispatch(slice.actions.setData(data));
  });
};

export default slice.reducer;
