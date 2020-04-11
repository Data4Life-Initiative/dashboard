import React from "react";
import { Container, Typography, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MapContainer from "./features/map/MapContainer";
import Dashboard from "./features/dashboard/Dashboard";
import Patient from "./features/patient/Patient";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from "@material-ui/core/Box";

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
    backgroundColor: "#d7d7d7",
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
    backgroundColor: "#f2f2f2"
  },
  main: {
    ...containerStyle,
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
  },
  dashboard: {
    ...containerStyle,
    flexGrow: 1,
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 6,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.withBar}>
      <Container className={classes.bar}>
        <Typography style={{color: "#3e3e3e", fontWeight: "bold", textTransform: "uppercase", padding: "5px", fontSize: "1.2rem"}}>Stockholm Region</Typography>

        <Box style={{padding: "5px", marginLeft: "auto", display: "flex", alignItems: "center"}}>
          <Typography style={{padding: "5px", fontStyle: "italic", marginLeft: "auto"}}>Logged in as Lotta Lundin</Typography>
          <AccountCircleIcon style={{ fontSize: 40 }} />
        </Box>

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
