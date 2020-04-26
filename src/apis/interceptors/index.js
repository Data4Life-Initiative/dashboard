import { message } from "antd";
import { get } from "../../utils/clientStorageUtils";

/**
 * Interceptor for api response errors
 * handles redirect to login when token is expired
 */
export function responseErrorInterceptor(error) {
  const response = error.response;
  if (response && response.status === 401) {
    // session expired message
    message.info("Your session has expired. Please sign in again.");
    // go to login view
    window.location.href = "/";
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
}

/**
 * Interceptor for api before api request
 * handles redirect to login when token is expired
 */
export function requestInterceptor(config) {
  if (config) {
    const access_token = get("accessToken");
    config.headers.common["Authorization"] = `Bearer ${access_token}`;
    return config;
  } else {
    return Promise.reject(config);
  }
}
