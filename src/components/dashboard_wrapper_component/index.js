import React from "react";
import { Drawer, Form, Button, Select } from "antd";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../dashboard/Dashboard";
import MapContainer from "../map/MapContainer";
import Patient from "../patient/Patient";
import AdminLayoutComponent from "../shared/admin-layout";

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
        //const classes = useStyles();

        return (
            <AdminLayoutComponent props={this.props}>
                {/* <Container className={classes.patient}>
                    <Patient />
                </Container> */}

                <Drawer
                    title="Patient"
                    width={400}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Patient />
                </Drawer>

                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined /> Patient
                </Button>

                <div className="dashboard">
                    <Dashboard />
                </div>
                <Container className="map-container site-layout-background">
                    <MapContainer
                        props={this.props}
                        style={{ position: "relative" }}
                    />
                </Container>
            </AdminLayoutComponent>
        );
    }
}
