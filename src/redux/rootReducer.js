import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { LoadingReducer } from "./reducers/LoadingReducer";
const rootReducer = combineReducers({
  LoadingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
