import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { remove } from "../../utils/clientStorageUtils";
import "./style.css";
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
                            src="https://storage.googleapis.com/igrant-api-images/privacy-dashboard/data4life.jpeg"
                        />
                    </div>
                    <p className="login-title">Login to Data4Life Dashboard</p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        onFinish={this.onFinish}
                    >
                        <div className="login-input-group">
                            <Form.Item
                                name="username"
                                className="ant-col ant-form-item-control"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                    },
                                ]}
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
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                    },
                                ]}
                            >
                                <Input
                                    className="buttonClass"
                                    prefix={
                                        <LockOutlined className="site-form-item-icon colorGrey" />
                                    }
                                    type="password"
                                    placeholder="Password"
                                    suffix={
                                        this.props.loading ? (
                                            <Spin indicator={antIcon} />
                                        ) : (
                                            suffix
                                        )
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
                </div>
            </div>
        );
    }
}
