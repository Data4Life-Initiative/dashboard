import { connect } from "react-redux";
import { adminSignIn } from "../../actions";
import { AdminLoginComponent } from "../../components/admin_login_component";
const mapDipatchToProps = {
  adminSignIn,
};

const mapStateToProps = (state) => {
  return {
    loading: state.data.auth.loading,
    adminSignInData: state.data.auth.admin,
  };
};

export const AdminLoginContainer = connect(
  mapStateToProps,
  mapDipatchToProps
)(AdminLoginComponent);
