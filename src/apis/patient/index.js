import axios from "axios";

import { apiUrl, ariesURL, connectionsEndpoint, isProduction, apiKey } from "../../constants";
import { responseErrorInterceptor, requestInterceptor, ariesRequestInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

const ariesAxiosInstance = axios.create({
  baseURL: ariesURL
});
ariesAxiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
ariesAxiosInstance.interceptors.request.use(ariesRequestInterceptor);


const connectionEndpointInstance = axios.create({
  baseURL: connectionsEndpoint,
  headers: {
    'Authorization': apiKey
  },
});
connectionEndpointInstance.interceptors.response.use(undefined, responseErrorInterceptor);
connectionEndpointInstance.interceptors.request.use(ariesRequestInterceptor);

/**
 *  Add patient
 * @return {Promise} Promise with details
 */
export function Addpatient(payload) {
  return axiosInstance.post("data-entry/patient/", payload);
}

export function getPatients(payload) {
  return axiosInstance.get("data-entry/patient/", payload);
}
