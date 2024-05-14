import React, { useState } from "react";
import WithAuthenticationTemplate from "../../templates/AuthTemplate/AuthTemplate";
import {
  LockOutlined,
  UserOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../libs/upload";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatar({
        file: e.target.files[0],
        url: imgUrl,
      });
    }
  };
  const handleRegister = async (values) => {
    const { username, email, password } = values;
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);
      // create users collection
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      // create userChats collection
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });
      // notify
      toast.success("Registerred successfully. You can login now.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="login-container w-2/3">
        <h2 className="mb-5 text-2xl font-bold text-center">Registration </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleRegister}
        >
          <div className="my-4">
            <label
              htmlFor="avatar"
              className="flex items-center gap-2 justify-center"
            >
              <img
                src={avatar.url || require("../../assets/img/avatar.png")}
                alt="avatar upload"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
              <span className="text-lg underline cursor-pointer">
                Upload avatar
              </span>
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleAvatar}
              style={{ display: "none" }}
            />
          </div>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
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
              {loading && <i className="fa-solid fa-rotate loading" />}
              <span className="ml-2">Register</span>
            </Button>
          </Form.Item>
        </Form>
        <div className="text-right p-0 mb-5">
          <Button
            type="link"
            icon={<DoubleRightOutlined />}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WithAuthenticationTemplate(Signup);
