import React, { useEffect } from "react";
import { Col, Card, Row, Statistic } from "antd";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectDashboardStats } from "./dashboardSlice";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { getDashboardStats } from "../../actions";

const maxW = {
    width: "100%",
    maxWidth: "100%",
    padding: 0,
};
const { Meta } = Card;

const useStyle = makeStyles({
    container: {
        height: "100%",
        ...maxW,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    stats: {
        // backgroundColor: "blue",
    },
    grid: {
        height: "100%",
        textAlign: "center",
        paddingTop: "15px",
    },
    gridItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textTransform: "uppercase",
    },
});

const Panel = () => {
    const dispatch = useDispatch();
    const classes = useStyle();
    const { immunized, naturally_immune, currently_infected } = useSelector(
        selectDashboardStats
    );

    useEffect(() => {
        //dispatch(fetchDashboardStats());
        dispatch(getDashboardStats());
    }, [dispatch]);

    return (
        <Row>
            <Col span={8} className="padding-right15">
                <Card>
                    <Grid item xs={12} className={classes.gridItem}>
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
                            style={{
                                height: "80px",
                            }}
                            viewBoxSize={[100, 100]}
                        />
                    </Grid>
                    <Meta
                        title="Immunized"
                        description=""
                        className="custom-text-center padding-top15 custom-border-top"
                    />
                </Card>
            </Col>
            <Col span={8} className="padding-left15 padding-right15">
                <Card>
                    <Grid item xs={12} className={classes.gridItem}>
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
                            style={{
                                height: "80px",
                            }}
                            viewBoxSize={[100, 100]}
                        />
                    </Grid>
                    <Meta
                        title="Naturally immune"
                        description=""
                        className="custom-text-center padding-top15 custom-border-top"
                    />
                </Card>
            </Col>
            <Col span={8} className="padding-left15">
                <Card>
                    <Grid item xs={12} className={classes.gridItem}>
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
                            style={{
                                height: "80px",
                            }}
                            viewBoxSize={[100, 100]}
                        />
                    </Grid>
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
