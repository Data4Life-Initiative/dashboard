import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import Dashboard from "../dashboard/Dashboard";
import MapContainer from "../map/MapContainer";
import Patient from "../patient/Patient";

const containerStyle = {
  maxWidth: "100%",
  padding: 0,
};
// const componentDidMount() {
//     this.props.getHotspotData();
//   }
const useStyles = makeStyles({
  withBar: {
    ...containerStyle,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    height: 50,
    width: 50,
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
    backgroundColor: "#f2f2f2",
  },
  main: {
    ...containerStyle,
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
  },
  dashboard: {
    ...containerStyle,
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 6,
  },
});
const DashboradWrapperComponent = (props, e) => {
  const classes = useStyles();
  console.log(props);
  return (
    <Container className={classes.withBar}>
      <Container className={classes.bar}>
        <img className={classes.logo} src="mainlogo.png" />
        <Typography
          style={{
            color: "#3e3e3e",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "5px",
            fontSize: "1.2rem",
            width: "300px",
          }}
        >
          Data4Life
        </Typography>
        <Typography
          style={{
            color: "#3e3e3e",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "5px",
            fontSize: "1.1rem",
          }}
        >
          Stockholm Region
        </Typography>

        <Box
          style={{
            padding: "5px",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ padding: "5px", fontStyle: "italic", marginLeft: "auto" }}
          >
            Logged in as Lotta Lundin
          </Typography>
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
            <MapContainer props={props} style={{ position: "relative" }} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default DashboradWrapperComponent;
