import { connect } from "react-redux";

import { RegistrationComponent } from "../../components/registration_component";
import { userRegistration, userRegistrationStart } from "../../actions";
const mapDipatchToProps = { userRegistration, userRegistrationStart };

const mapStateToProps = (state) => {
  return {};
};

export const RegistrationContainer = connect(
  mapStateToProps,
  mapDipatchToProps
)(RegistrationComponent);
