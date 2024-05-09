import React from "react";
import WithAuthenticationTemplate from "../../templates/AuthTemplate/AuthTemplate";
import {
  LockOutlined,
  UserOutlined,
  GooglePlusOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="login-container w-2/3">
        <h2 className="mb-2 text-2xl font-bold text-center">Login</h2>
        <p className="mb-5 text-center">With Your Account</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Wrong email format",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 8,
                message: "Minlength is 8",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="text-right p-0 mb-5">
          <Button
            type="link"
            icon={<DoubleRightOutlined />}
            onClick={() => navigate("/signup")}
          >
            Regiter
          </Button>
        </div>
        <hr />
        <p className="mt-5 text-center">Or Login With Google</p>
        <div className="text-center py-2">
          <Button
            shape="circle"
            icon={<GooglePlusOutlined />}
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default WithAuthenticationTemplate(Login);
