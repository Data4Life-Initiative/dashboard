import { connect } from "react-redux";
import { adminSignIn } from "../../actions";
import { AdminLoginComponent } from "../../components/admin_login_component";
const mapDipatchToProps = {
  adminSignIn,
};

const mapStateToProps = (state) => {
  return {
    adminSignInData: state.data.auth.adminSignIn,
  };
};

export const AdminLoginContainer = connect(
  mapStateToProps,
  mapDipatchToProps
)(AdminLoginComponent);
