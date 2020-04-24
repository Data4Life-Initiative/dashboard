import axios from "axios";

import { apiUrl } from "../../constants";
import { responseErrorInterceptor, requestInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

/**
 * Dashboard  Api
 * @return {Promise} Promise with details
 */
export function getDashboardStats(payload) {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOiJhZG1pbiIsInJhbmQiOjAuNTQwNTI4MzkzMTYxODk3OH0._1CvDWqCAUONahmwnK6lv8KF_tXnvxIyz-JVXgVuArs`,
  //     },
  //   };
  return axiosInstance.get(
    "https://mydata4life-api.igrant.io/v1/data-entry/dashboard/stats/"
    //config
  );
}
/**
 * Get Hotspot data  Api
 * @return {Promise} Promise with details
 */
export function getHotspotData(payload) {
  const config = {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOiJhZG1pbiIsInJhbmQiOjAuNTQwNTI4MzkzMTYxODk3OH0._1CvDWqCAUONahmwnK6lv8KF_tXnvxIyz-JVXgVuArs`,
    },
  };
  return axiosInstance.get(
    "https://mydata4life-api.igrant.io/v1/data-entry/disease-hotspots/",
    config
  );
}
