import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // reducers here
});

const store = configureStore({
  rootReducer: rootReducer,
});

export default store;
