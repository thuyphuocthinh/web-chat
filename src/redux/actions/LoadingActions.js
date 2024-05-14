import { HIDE_LOADING, OPEN_LOADING } from "../actionTypes/LoadingTypes";

export const openLoadingAction = () => {
  return {
    type: OPEN_LOADING,
  };
};

export const hideLoadingAction = () => {
  return {
    type: HIDE_LOADING,
  };
};
