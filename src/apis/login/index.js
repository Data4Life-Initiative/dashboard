import axios from "axios";

import { apiUrl } from "../../constants";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

/**
 * Fetch otp
 * @return {Promise} Promise with details
 */
export function OtpSend(mobileNumber) {
  const payload = {
    mobile: mobileNumber,
  };
  return axiosInstance.post("auth/otp/send/", payload);
}
/**
 * Verify otp
 * @return {Promise} Promise with details
 */
export function verifyOtp(payload) {
  return axiosInstance.post("auth/otp/verify/citizen", payload);
}

/**
 * Login Admin  Api
 * @return {Promise} Promise with details
 */
export function adminSignIn(payload) {
  return axiosInstance.post("auth/data-entry/admin/login/", payload);
}
