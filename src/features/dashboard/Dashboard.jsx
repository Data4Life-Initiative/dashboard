import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import StatComponent from "./StatComponent";
import { selectDashboardStats, fetchDashboardStats } from "./dashboardSlice";

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
    alignItems: "center"
  },
  stats: {
    // backgroundColor: "blue",
  },
  grid: {
    height: "100%",
    textAlign: "center"
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase"
  },
});

const Panel = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const { immune, naturally_immune, cured } = useSelector(selectDashboardStats);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <Container className={classes.container}>
      <Container className={classes.stats}>
        <Grid container className={classes.grid}>
          <Grid item xs={4} className={classes.gridItem}>
            <StatComponent title="Immune" value={immune} />
            <p>Immunized</p>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <StatComponent title="Naturally immune" value={naturally_immune} />
            <p>Naturally immune</p>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <StatComponent title="Cured" value={cured} />
            <p>Cured</p>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Panel;
