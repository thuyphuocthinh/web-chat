import { HIDE_LOADING, OPEN_LOADING } from "../actionTypes/LoadingTypes";

const initialState = {
  isLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
