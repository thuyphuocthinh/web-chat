import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";

export default function PrivateRoute(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.UserReducer);

  if (!isLoggedIn) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/login")}>
            Login Now
          </Button>
        }
      />
    );
  }

  return <>{props.children}</>;
}
