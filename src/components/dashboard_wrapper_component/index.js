import React from "react";
import { Drawer, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../dashboard/Dashboard";
import MapContainer from "../map/MapContainer";
import Patient from "../patient/Patient";
import AdminLayoutComponent from "../shared/admin-layout";
import "./main-style.css";

export default class DashboradWrapperComponent extends React.Component {
    state = { visible: false };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <AdminLayoutComponent props={this.props}>
                <Drawer
                    title="Patient"
                    className="custom-drawer"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose={true}
                >
                    <Patient />
                </Drawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined /> Patient
                </Button>

                <div className="dashboard">
                    <Dashboard />
                </div>
                <div className="map-container site-layout-background">
                    <MapContainer
                        props={this.props}
                        style={{ position: "relative" }}
                    />
                </div>
            </AdminLayoutComponent>
        );
    }
}
