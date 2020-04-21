import axios from "axios";

import { apiUrl } from "../../constants";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

/**
 * Registration  Api
 * @return {Promise} Promise with details
 */
export function userRegistration(payload) {
  return axiosInstance.post("auth/data-entry/admin/register/", payload);
}
