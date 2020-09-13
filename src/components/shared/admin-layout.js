import React from "react";

import { Layout, Row, Typography, Menu, Dropdown } from "antd";
import Icon from "@ant-design/icons";

import "./style.css";
import accountIcon from "./account-circle.svg";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const AdminLayoutComponent = (props, e) => {
    const logout = () => {
        props.props.history.push("/");
    };
    const menu = (
        <Menu>
            <Menu.Item>
                {/* eslint-disable */}
                <a href="javascript:void(0);" onClick={logout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Header className="custom-layout-header">
                <img
                    className="logo"
                    src="/healthcare_logo.jpg"
                    alt=""
                />
                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        padding: "5px",
                        display: "inline-flex",
                    }}
                    className="custom-left"
                >
                    Data4Life
                </Text>
                <Text
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        padding: "5px",
                        fontSize: "1.1rem",
                    }}
                    className="custom-middle"
                >
                    Stockholm Region
                </Text>

                <div
                    style={{
                        padding: "5px",
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        display: "inline-flex",
                        color: "#fff",
                    }}
                    className="custom-right"
                >
                    <Text
                        style={{
                            padding: "5px",
                            fontStyle: "italic",
                            marginLeft: "auto",
                            fontSize: "1rem",
                            color: "#fff",
                        }}
                    >
                        Logged in as Lotta Lundin
                    </Text>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Icon
                            component={() => (
                                <img
                                    src={accountIcon}
                                    className="imgIcon"
                                    overlay={menu}
                                />
                            )}
                        />
                    </Dropdown>
                </div>
            </Header>
            <Content
                className="site-layout"
                style={{ padding: "0 50px", marginTop: 0 }}
            >
                <div className="padding-top15">
                    <Row>{props.children}</Row>
                </div>
            </Content>
            <Footer className="aligncenter">
                <div className="footer">
                    <div>
                        <small>
                            Copyright © 2019 LCubed AB, Sweden. All rights
                            reserved.
                        </small>
                    </div>
                    <div>
                        <a>Language</a>
                    </div>
                </div>
            </Footer>
        </Layout>
    );
};

export default AdminLayoutComponent;
