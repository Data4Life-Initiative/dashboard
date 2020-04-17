import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./style.css";
export class LoginComponent extends React.PureComponent {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  render() {
    const suffix = (
      <span className="ant-input-suffix">
        <div>
          <img
            alt=""
            className="login-btn right-arrow"
            src="https://data4life.igrant.io/static/media/arrow.e2be9365.svg"
          />
        </div>
      </span>
    );
    return (
      <div className="login-container-main">
        <div className="logo">
          <img
            alt=""
            src="https://storage.googleapis.com/igrant-api-images/privacy-dashboard/data4life.jpeg"
          />
        </div>
        <p className="login-title">Log in to your Dashboard</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
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
                prefix={
                  <LockOutlined className="site-form-item-icon colorGrey" />
                }
                type="password"
                placeholder="Password"
                suffix={suffix}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
