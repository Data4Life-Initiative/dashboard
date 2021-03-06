import React, { useEffect } from "react";
import { Col, Card, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectDashboardStats } from "./dashboardSlice";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { getDashboardStats } from "../../actions";
import classes from "./dashboard.module.css";

const { Meta } = Card;

const Panel = () => {
    const dispatch = useDispatch();
    const { immunized, naturally_immune, currently_infected } = useSelector(
        selectDashboardStats
    );

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    return (
        <Row>
            <Col xs={24} md={24} lg={8} xl={8} className="">
                <Card>
                    <Col
                        item
                        xs={24}
                        md={24}
                        lg={24}
                        xl={24}
                        className={classes.gridItem}
                    >
                        <ReactMinimalPieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            background="#f2f2f2"
                            cx={50}
                            cy={50}
                            data={[
                                {
                                    color: "#000080",
                                    title: "Immunized",
                                    value: immunized,
                                },
                            ]}
                            label
                            labelPosition={50}
                            labelStyle={{
                                fill: "#fff",
                                fontFamily: "sans-serif",
                                fontSize: "15px",
                            }}
                            lengthAngle={360}
                            lineWidth={100}
                            paddingAngle={0}
                            radius={50}
                            rounded={false}
                            startAngle={0}
                            totalValue={100}
                            className={classes.customPieHeight}
                            viewBoxSize={[100, 100]}
                        />
                    </Col>
                    <Meta
                        title="Immunized"
                        description=""
                        className="custom-text-center padding-top15 custom-border-top"
                    />
                </Card>
            </Col>
            <Col xs={24} md={24} lg={8} xl={8} className="">
                <Card>
                    <Col
                        item
                        xs={24}
                        md={24}
                        lg={24}
                        xl={24}
                        className={classes.gridItem}
                    >
                        <ReactMinimalPieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            background="#f2f2f2"
                            cx={50}
                            cy={50}
                            data={[
                                {
                                    color: "#000080",
                                    title: "Naturally immune",
                                    value: naturally_immune,
                                },
                            ]}
                            label
                            labelPosition={50}
                            labelStyle={{
                                fill: "#fff",
                                fontFamily: "sans-serif",
                                fontSize: "15px",
                            }}
                            lengthAngle={360}
                            lineWidth={100}
                            paddingAngle={0}
                            radius={50}
                            rounded={false}
                            startAngle={0}
                            totalValue={100}
                            viewBoxSize={[100, 100]}
                            className={classes.customPieHeight}
                        />
                    </Col>
                    <Meta
                        title="Naturally immune"
                        description=""
                        className="custom-text-center padding-top15 custom-border-top"
                    />
                </Card>
            </Col>
            <Col xs={24} md={24} lg={8} xl={8} className="">
                <Card>
                    <Col
                        item
                        xs={24}
                        md={24}
                        lg={24}
                        xl={24}
                        className={classes.gridItem}
                    >
                        <ReactMinimalPieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            background="#f2f2f2"
                            cx={50}
                            cy={50}
                            data={[
                                {
                                    color: "#000080",
                                    title: "Cured",
                                    value: currently_infected,
                                },
                            ]}
                            label
                            labelPosition={50}
                            labelStyle={{
                                fill: "#fff",
                                fontFamily: "sans-serif",
                                fontSize: "15px",
                            }}
                            lengthAngle={360}
                            lineWidth={100}
                            paddingAngle={0}
                            radius={50}
                            rounded={false}
                            startAngle={0}
                            totalValue={100}
                            viewBoxSize={[100, 100]}
                            className={classes.customPieHeight}
                        />
                    </Col>
                    <Meta
                        title="Currently Infected"
                        description=""
                        className="custom-text-center padding-top15 custom-border-top"
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Panel;
