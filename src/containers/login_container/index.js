import { connect } from "react-redux";
import {
  getNews,
  getOtp,
  getReceivedOtp,
  verifyOtp,
  otpVerified,
  restAllOtpData,
  adminSignIn,
} from "../../actions";
import { LoginComponent } from "../../components/login_component";
const mapDipatchToProps = {
  getNews,
  getOtp,
  getReceivedOtp,
  verifyOtp,
  otpVerified,
  restAllOtpData,
  adminSignIn,
};

const mapStateToProps = (state) => {
  return {
    otpData: state.data.auth,
    loading: state.data.auth.loading,
    otpVerifiedData: state.data.auth.otpVerified,
  };
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDipatchToProps
)(LoginComponent);
