import axios from "axios";

import { apiUrl } from "../../constants";
import { responseErrorInterceptor, requestInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

/**
 *  Add patient
 * @return {Promise} Promise with details
 */
export function Addpatient(payload) {
  return axiosInstance.post("data-entry/patient/", payload);
}
