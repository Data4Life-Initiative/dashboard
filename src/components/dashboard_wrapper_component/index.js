import React from "react";
import { Drawer, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../dashboard/Dashboard";
import MapContainer from "../map/MapContainer";
import Patient from "../patient/Patient";
import IssueCertificate from "../issue_certificate/IssueCertificate";
import AdminLayoutComponent from "../shared/admin-layout";
import "./main-style.css";

export default class DashboradWrapperComponent extends React.Component {
    state = { showAddPatientVisible: false, showIssueCertificateVisible: false };

    showAddPatientDrawer = () => {
        this.setState({
            showAddPatientVisible: true,
        });
    };

    showIssueCertificateDrawer = () => {
        this.setState({
            showIssueCertificateVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            showAddPatientVisible: false,
            showIssueCertificateVisible: false
        });
    };

    render() {
        return (
            <AdminLayoutComponent props={this.props}>
                <Drawer
                    title="Patient"
                    className="custom-drawer"
                    onClose={this.onClose}
                    visible={this.state.showAddPatientVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose={true}
                >
                    <Patient />
                </Drawer>

                <Drawer
                    title="Issue Certificate"
                    className="custom-drawer"
                    onClose={this.onClose}
                    visible={true || this.state.showIssueCertificateVisible}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose={true}
                >
                    <IssueCertificate />
                </Drawer>

                <Button type="primary dashboard-buttons" onClick={this.showAddPatientDrawer}>
                    <PlusOutlined /> Patient
                </Button>

                <Button type="primary issue-certificate-button dashboard-buttons" onClick={this.showIssueCertificateDrawer}>
                    <PlusOutlined /> Issue Certificate
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
