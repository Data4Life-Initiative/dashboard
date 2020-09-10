import axios from "axios";

import { apiUrl, ariesURL, connectionsEndpoint } from "../../constants";
import { responseErrorInterceptor, requestInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

const ariesAxiosInstance = axios.create({
  baseURL: ariesURL
});
ariesAxiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
ariesAxiosInstance.interceptors.request.use(requestInterceptor);

const connectionEndpointInstance = axios.create({
  baseURL: connectionsEndpoint
});
connectionEndpointInstance.interceptors.response.use(undefined, responseErrorInterceptor);
connectionEndpointInstance.interceptors.request.use(requestInterceptor);

/**
 *  Add patient
 * @return {Promise} Promise with details
 */
export function Addpatient(payload) {
  return axiosInstance.post("data-entry/patient/", payload);
}

export function getPatientsFromAries(payload) {
  return connectionEndpointInstance.get("", payload);
}
