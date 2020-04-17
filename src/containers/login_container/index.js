import { connect } from "react-redux";
import { getNews } from "../../actions";
import { LoginComponent } from "../../components/login_component";
const mapDipatchToSprops = { getNews };
function mapStateToProps(state) {
  return {};
}
export const LoginContainer = connect(
  mapStateToProps,
  mapDipatchToSprops
)(LoginComponent);
