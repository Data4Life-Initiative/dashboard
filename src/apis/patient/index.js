import axios from "axios";

import { apiUrl, ariesURL, connectionsEndpoint, isProduction } from "../../constants";
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
  baseURL: connectionsEndpoint,
  headers: {
    'Authorization': isProduction ? 'ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1YzE4YWRiMDU0MzA0NjAwMDFhZjYyNTAiLCJleHAiOjE2MzA2OTM2MzJ9.6ot0dRulSs4k6F0zreJK8i6g_j1Q_6k7YIsCp8D7SLM' : '',
  },
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
