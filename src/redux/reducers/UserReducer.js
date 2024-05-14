import { USER_TOKEN } from "../../settings/system";
import { LOG_IN, LOG_OUT, SET_USER_INFO } from "../actionTypes/UserTypes";

const UserToken = localStorage.getItem(USER_TOKEN);

const initialState = {
  isLoggedIn: UserToken ? true : false,
  currentUser: null,
};

export const UserReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        currentUser: payload,
      };
    }
    default: {
      return state;
    }
  }
};
