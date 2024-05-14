import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openLoadingAction } from "../redux/actions/LoadingActions";

export default function AuthRoute(props) {
  const { isLoggedIn } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  if (isLoggedIn) {
    dispatch(openLoadingAction());
    return <Navigate to="/" replace />;
  }

  return <>{props.children}</>;
}
