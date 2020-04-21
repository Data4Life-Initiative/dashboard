import { loginActionTypes } from "../../actions_types";

export const getOtp = (payload) => {
  return {
    type: loginActionTypes.getOtp,
    payload: payload,
  };
};
export const getReceivedOtp = () => {
  return {
    type: loginActionTypes.OtpReceived,
  };
};

export const verifyOtp = (payload) => {
  return {
    type: loginActionTypes.verifyOtp,
    payload: payload,
  };
};
export const otpVerified = () => {
  return {
    type: loginActionTypes.otpVerified,
  };
};
export const restAllOtpData = () => {
  return {
    type: loginActionTypes.resetAllOtpData,
  };
};
export const adminSignIn = (payload) => {
  return {
    type: loginActionTypes.adminSignIn,
    payload: payload,
  };
};
export const adminSignInSuccessfully = () => {
  return {
    type: loginActionTypes.adminSignInSuccessfully,
  };
};
