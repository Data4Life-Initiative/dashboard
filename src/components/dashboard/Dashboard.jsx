import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import StatComponent from "./StatComponent";
import { selectDashboardStats, fetchDashboardStats } from "./dashboardSlice";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { getDashboardStats } from "../../actions";

const maxW = {
  width: "100%",
  maxWidth: "100%",
  padding: 0,
};

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
  const { immune, naturally_immune, cured } = useSelector(selectDashboardStats);

  useEffect(() => {
    //dispatch(fetchDashboardStats());
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Container className={classes.container}>
      <Container className={classes.stats}>
        <Grid container className={classes.grid}>
          <Grid item xs={4} className={classes.gridItem}>
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
                  value: immune,
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
            <p>Immunized</p>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
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
            <p>Naturally immune</p>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
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
                  value: cured,
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
            <p>CURRENTLY INFECTED</p>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Panel;
