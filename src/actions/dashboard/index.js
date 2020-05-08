import { dashboardActionTypes } from "../../actions_types";

export const getDashboardStats = () => {
  return {
    type: dashboardActionTypes.getDataBoard,
  };
};

export const getHotspotData = () => {
  return {
    type: dashboardActionTypes.getHotspotData,
  };
};

export const addLocationData = (payload) => {
  return {
    type: dashboardActionTypes.addLocation,
    payload: payload,
  };
};

export const setCenterData = (payload) => {
  return {
    type: dashboardActionTypes.setCenter,
    payload: payload,
  };
};
export const setInfectionStatusData = (payload) => {
  return {
    type: dashboardActionTypes.setInfectionStatus,
    payload: payload,
  };
};
