import React from "react";
import { Form, Button, Input, Checkbox } from "antd";
import "./style.css";

export class RegistrationComponent extends React.PureComponent {
    state = { prefixValue: "+91", value: "", current: 0, otp: "" };
    formRef = React.createRef();
    onFinish = (values) => {
        let payload = {
            fullname: values.firstName + " " + values.lastName,
            email: values.email,
            password: values.password,
            designation: "Head of CDC",
            department: "Department of daignostics",
            organisation: "NHS",
            region_name: "Stockholm",
            region_latitude: 59.335173,
            region_longitude: 18.065819,
        };
        this.props.userRegistrationStart(payload);
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <div className="registration-container-main verticalCenter">
                <div className="logo">
                    <img
                        alt=""
                        src="https://storage.googleapis.com/igrant-api-images/privacy-dashboard/data4life.jpeg"
                    />
                </div>
                <p className="registration-title">Registration</p>

                <Form
                    ref={this.formRef}
                    name="register"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={this.onFinish}
                    className="registration-form"
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your First Name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Last Name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The two passwords that you entered do not match!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        label=" "
                        valuePropName="checked"
                        className="custom-check"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              "Should accept agreement"
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            {/* eslint-disable */}I have read the{" "}
                            <a href="#">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className="custom-button aligncenter">
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
