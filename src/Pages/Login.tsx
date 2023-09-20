import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { APP_TOKEN_KEY } from "../constants";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    axios
      .post("/auth", {
        username: values.username,
        password: values.password,
      })
      .then((res: any) => {
        const data = res.data.data;
        localStorage.setItem(APP_TOKEN_KEY, data.token);
        window.location.href = searchParams.has("next") ? searchParams.get("next") || "/" : "/";
      })
      .catch((err: any) => {
        err.handleGlobally && err.handleGlobally("Login Error");
      });
  };

  return (
    <div className="login-card-div">
      <h1>Login</h1>
      <img
        // src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png"
        src={"/logo.png"}
        alt="React Logo"
        height="100px"
        className="login-logo"
      />
      <Form
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        title="Login"
        // style={{ width: "500px" }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
