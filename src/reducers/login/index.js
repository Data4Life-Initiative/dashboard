import { loginActionTypes } from "../../actions_types";
const initialState = {
  otp: null,
  otpVerified: null,
  loading: false,
  admin: null,
  accessToken: "",
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.getOtp:
      return { ...state, loading: true };
    case loginActionTypes.OtpReceived:
      return { ...state, otp: action.json, loading: false };
    case loginActionTypes.verifyOtp:
      return { ...state, loading: true };
    case loginActionTypes.otpVerified:
      return { ...state, otpVerified: action.json, loading: false };
    case loginActionTypes.resetAllOtpData:
      return { ...initialState, loading: false };
    case loginActionTypes.adminSignIn:
      return { ...state, loading: true };
    case loginActionTypes.adminSignInSuccessfully:
      return { ...state, admin: action.json, loading: false };
    case loginActionTypes.accessToken:
      return { ...state, accessToken: action.value, loading: false };
    case loginActionTypes.adminSignInError:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default LoginReducer;
