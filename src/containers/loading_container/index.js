import { connect } from "react-redux";
import { LoadingComponent } from "../../components/loading_component";

const mapStateToProps = (state) => ({ loading: state.loading });

export const LoadingContainer = connect(
  mapStateToProps,
  null
)(LoadingComponent);
