import React from "react";
import OtpInput from "react-otp-input";
import { Form, Button, Input, Col, Row, Space, message } from "antd";
import { NumericInputComponent } from "../form_component";

import "./style.css";
export class LoginComponent extends React.PureComponent {
    state = { prefixValue: "+91", value: "", current: 0, otp: "" };
    formRef = React.createRef();
    onFinish = (values) => {
        const verifyOtpDataStatus =
            this.props.otpData.otp != null &&
            this.props.otpData.otp.status === 200;

        if (!verifyOtpDataStatus) {
            this.props.getOtp(values.prefixMobile + values.mobilenumber);
            //   const current = this.state.current + 1;
            //   this.setState({ current });
        } else if (verifyOtpDataStatus) {
            const payload = {
                mobile: this.state.prefixValue + this.state.value,
                otp: values.userEnteredOtp,
            };
            this.props.verifyOtp(payload);
        }
    };

    onChange = (value) => {
        this.setState({ value });
    };

    onChangePrefix = (e) => {
        this.setState({ prefixValue: e.target.value });
    };

    onChangeOtp = (otp) => {
        this.setState({ otp });
    };

    onClickResend = () => {
        this.props.getOtp(this.state.prefixValue + this.state.value);
        message.success(`Verification code sent to ` + this.state.value);
    };

    onClickChange = () => {
        this.onChangeOtp("");
        this.formRef.current.setFieldsValue({
            userEnteredOtp: "",
        });
        this.props.restAllOtpData();
    };

    render() {
        const otpDataStatus =
            this.props.otpData.otp === null ||
            this.props.otpData.otp.status !== 200;
        const verifyOtpDataStatus =
            this.props.otpData.otp !== null &&
            this.props.otpData.otp.status === 200;
        if (
            this.props.otpVerifiedData != null &&
            this.props.otpVerifiedData.status === 200
        ) {
            message.success(this.props.otpVerifiedData.data.msg);
            this.props.history.push("/dashboard");
        }
        return (
            <div className="login-container">
                <div className="login-container-main verticalCenter">
                    <div className="logo">
                        <img
                            alt=""
                            src="https://storage.googleapis.com/igrant-api-images/privacy-dashboard/data4life.jpeg"
                        />
                    </div>
                    <p className="login-title">Login to Data4Life Dashboard</p>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            mobilenumber: "",
                            prefixMobile: "+91",
                            userEnteredOtp: "",
                        }}
                        onFinish={this.onFinish}
                    >
                        <div className="login-input-group">
                            {otpDataStatus && (
                                <Input.Group size="large">
                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <Form.Item
                                                name="prefixMobile"
                                                className="prefixtextbox ant-col ant-form-item-control"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "This field is required!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onChange={
                                                        this.onChangePrefix
                                                    }
                                                    className=""
                                                    placeholder="Code"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="mobilenumber"
                                                className="ant-col ant-form-item-control"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "This field is required!",
                                                    },
                                                ]}
                                            >
                                                <NumericInputComponent
                                                    maxLength="10"
                                                    placeholder="Mobile Number"
                                                    value={this.state.value}
                                                    onChange={this.onChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <div
                                            className="login-divider-m0 ant-divider ant-divider-horizontal"
                                            role="separator"
                                        ></div>
                                    </Row>
                                </Input.Group>
                            )}
                            {verifyOtpDataStatus && (
                                <Space
                                    direction="vertical"
                                    className="spaceVertical"
                                >
                                    <Form.Item className="aligncenter  margin-bottom10">
                                        Please enter the OTP sent to{" "}
                                        {this.state.value}
                                        {/* eslint-disable */}
                                        <a
                                            className="margin5px"
                                            onClick={this.onClickChange}
                                        >
                                            Change
                                        </a>
                                    </Form.Item>
                                    <Form.Item
                                        name="userEnteredOtp"
                                        className="ant-col ant-form-item-control otpInputStyle spaceVertical"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "This field is required!",
                                            },
                                        ]}
                                    >
                                        <OtpInput
                                            onChange={this.onChangeOtp}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            value={this.state.otp}
                                            isInputNum={true}
                                            maxLength={1}
                                        />
                                    </Form.Item>
                                </Space>
                            )}

                            <Form.Item className="aligncenter margin-bottom10">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={this.props.loading}
                                >
                                    {verifyOtpDataStatus
                                        ? "Verify OTP"
                                        : "Request OTP"}
                                </Button>
                            </Form.Item>
                            {verifyOtpDataStatus && (
                                <Form.Item className="aligncenter">
                                    Not received your code?
                                    <a
                                        className="margin5px"
                                        href="#"
                                        onClick={this.onClickResend}
                                    >
                                        Resend code
                                    </a>
                                </Form.Item>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
