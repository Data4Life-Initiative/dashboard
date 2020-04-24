import configurestore from "../../store/configurestore";
import { message } from "antd";
import { push } from "react-router-redux";

/**
 * Interceptor for api response errors
 * handles redirect to login when token is expired
 */
export function responseErrorInterceptor(error) {
  const store = configurestore();
  const response = error.response;

  if (response && response.status == 401) {
    // session expired message
    message.info("Your session has expired. Please sign in again.");
    // go to login view
    window.location.href = "/adminlogin";
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
    config.headers.common[
      "Authorization"
    ] = `Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOiJhZG1pbiIsInJhbmQiOjAuNTQwNTI4MzkzMTYxODk3OH0._1CvDWqCAUONahmwnK6lv8KF_tXnvxIyz-JVXgVuArs`;
    return config;
  } else {
    return Promise.reject(config);
  }
}
