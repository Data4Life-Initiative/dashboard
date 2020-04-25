import { connect } from "react-redux";
import { getHotspotData, addLocationData } from "../../actions";

import DashboradWrapperComponent from "../../components/dashboard_wrapper_component";
const mapDipatchToSprops = { getHotspotData, addLocationData };
function mapStateToProps(state) {
  return {
    dashboardData: state.data.auth,
  };
}
export const DashboradWrapperContainer = connect(
  mapStateToProps,
  mapDipatchToSprops
)(DashboradWrapperComponent);
