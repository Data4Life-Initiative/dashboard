import React from "react";
import { Form, Input, Button, Spin, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { remove } from "../../utils/clientStorageUtils";
import "./style.css";

const { Text } = Typography;

export class AdminLoginComponent extends React.PureComponent {
  componentDidMount() {
    remove("accessToken");
  }

  onFinish = (values) => {
    let payload = {
      email: values.username,
      password: values.password,
      history: this.props.history,
    };
    this.props.adminSignIn(payload);
  };

  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const suffix = (
      <Button
        htmlType="submit"
        className="borderNone"
        icon={
          <img
            alt=""
            className="login-btn right-arrow"
            src="https://data4life.igrant.io/static/media/arrow.e2be9365.svg"
          />
        }
        loading={this.props.loading}
      ></Button>
    );
    return (
      <div className="login-container-main">
        <div className="login-container-main verticalCenter">
          <div className="logo">
            <img
              alt=""
              src="/healthcare_logo.jpg"
            />
          </div>
          <p className="login-title">Login to Admin Dashboard</p>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              username: "",
              password: "",
            }}
            onFinish={this.onFinish}
          >
            <div className="login-notice-text">
              <p>Please do not attempt to login to the system </p>
              <p>if you are not authorised to do so.</p>
            </div>

            <div className="login-input-group">
              <Form.Item
                name="username"
                className="ant-col ant-form-item-control"
              >
                <Input
                  prefix={
                    <UserOutlined className="site-form-item-icon colorGrey" />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <div
                className="login-divider-m0 ant-divider ant-divider-horizontal"
                role="separator"
              ></div>
              <Form.Item name="password">
                <Input
                  className="buttonClass"
                  prefix={
                    <LockOutlined className="site-form-item-icon colorGrey" />
                  }
                  type="password"
                  placeholder="Password"
                  suffix={
                    this.props.loading ? <Spin indicator={antIcon} /> : suffix
                  }
                />
              </Form.Item>
              {/* <div
                className="login-divider-m0 ant-divider ant-divider-horizontal"
                role="separator"
              ></div> */}
              {/* <Form.Item className="aligncenter">
                <Button
                  type="primary"
                  size="default"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.props.loading}
                >
                  Login
                </Button>
              </Form.Item> */}
            </div>
          </Form>
          <Form>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
                <Text strong>Remember me</Text>
              </Checkbox>
            </Form.Item>
          </Form>
        </div>
        <div
          className="footer"
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: "10px",
          }}
        >
          <div>
            <small>
              Copyright © 2019 LCubed AB, Sweden. All rights reserved.
            </small>
          </div>
          <div>
            {/* eslint-disable */}
            <a href="#">Language</a>
          </div>
        </div>
      </div>
    );
  }
}
