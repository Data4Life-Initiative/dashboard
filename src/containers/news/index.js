import { connect } from "react-redux";
import { getNews } from "../../actions";

import { NewsComponent } from "../../components/news_component";
const mapDipatchToSprops = { getNews };
function mapStateToProps(state) {
  return {};
}
export const NewsContainer = connect(
  mapStateToProps,
  mapDipatchToSprops
)(NewsComponent);
