import { newActionTypes } from "../../actions_types";

const NewsReducer = (state = {}, action) => {
  switch (action.type) {
    case newActionTypes.getNews:
      return { ...state, loading: true };
    case newActionTypes.newsReceived:
      return { ...state, news: action.json[0], loading: false };
    default:
      return state;
  }
};
export default NewsReducer;
