import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { thunk } from "redux-thunk";
import { UserReducer } from "./reducers/UserReducer";
import { ChatReducer } from "./reducers/ChatReducer";
const rootReducer = combineReducers({
  LoadingReducer,
  UserReducer,
  ChatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
});

export default store;
