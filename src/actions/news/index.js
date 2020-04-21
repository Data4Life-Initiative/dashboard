import { newActionTypes } from "../../actions_types";

export const getNews = () => {
  return {
    type: newActionTypes.getNews,
  };
};
