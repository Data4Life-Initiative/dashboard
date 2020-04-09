import React from "react";
import { Container, Typography, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MapContainer from "./features/map/MapContainer";
import Dashboard from "./features/dashboard/Dashboard";
import Patient from "./features/patient/Patient";

const containerStyle = {
  maxWidth: "100%",
  padding: 0,
};

const useStyles = makeStyles({
  withBar: {
    ...containerStyle,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    ...containerStyle,
    backgroundColor: "green",
    display: "inline-flex",
    lineHeight: 20,
    alignItems: "center",
    padding: 5,
  },
  app: {
    ...containerStyle,
    flexGrow: 1,
    width: "100%",
    display: "flex",
    // flexDirection: "column",
  },
  patient: {
    ...containerStyle,
    width: "450px",
    flexGrow: 0,
  },
  main: {
    ...containerStyle,
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
  },
  dashboard: {
    ...containerStyle,
    flexGrow: 0.3,
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.withBar}>
      <Container className={classes.bar}>
        <Typography>Stockholm Region</Typography>
        <Select style={{ marginLeft: 15 }} value={1}>
          <MenuItem value={1}>COVID-19 PANDEMIC</MenuItem>
          <MenuItem value={2}>SEASONAL FLU</MenuItem>
        </Select>
      </Container>
      <Container className={classes.app}>
        <Container className={classes.patient}>
          <Patient />
        </Container>
        <Container className={classes.main}>
          <Container className={classes.dashboard}>
            <Dashboard />
          </Container>
          <Container className={classes.mapContainer}>
            <MapContainer />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default App;
