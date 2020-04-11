import React, { useRef, useState, Fragment } from "react";
import {
  Container,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import PlaceIcon from "@material-ui/icons/Place";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/styles";

import { StandaloneSearchBox } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

import {
  selectMapLoaded,
  addLocation,
  selectLocations,
  setCenter,
} from "../map/mapSlice";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyle = makeStyles({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    textAlign: "center",
    marginTop: 20
  },
  qr: {
    height: 200,
    width: 250,
    marginTop: 10,
    marginBottom: 25,
    border: "1px solid black",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  action: {
    marginTop: 10,
  },
});

const Expansion = (props) => {
  const classes = useStyle();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const locationIcon = {
  home: <HomeIcon />,
  work: <BusinessIcon />,
  place: <PlaceIcon />,
};

const Location = ({ location, id }) => {
  const dispatch = useDispatch();

  return (
    <ListItem button onClick={() => dispatch(setCenter(location.latLng))}>
      <ListItemIcon>{locationIcon[location.type]}</ListItemIcon>
      <ListItemText>{location.address}</ListItemText>
    </ListItem>
  );
};

const Panel = () => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const [adding, setAdding] = useState(null);
  const [place, setPlace] = useState(null);

  const cancel = () => {
    setAdding(null);
    setPlace(null);
  };

  const addPlace = (type) => {
    const loc = place[0].geometry.location;
    const latLng = { lat: loc.lat(), lng: loc.lng() };
    const newLocation = {
      type,
      address: place[0].name,
      latLng,
    };
    dispatch(addLocation(newLocation));
    cancel();
  };

  const search = useRef(null);
  const mapLoaded = useSelector(selectMapLoaded);
  const locations = useSelector(selectLocations);

  return (
    <Container className={classes.container}>



      <Typography style={{fontWeight: "bold", fontSize: "18px"}}>ADD NEW PATIENTS</Typography>
      <Container className={classes.qr}>
        <Typography align="center">SCAN PATIENT QR CODE</Typography>
      </Container>
      <Expansion title="Patients mobile number">
        <FormControl>
          <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
      </Expansion>

      <Expansion title="Locations">
        <List>
          {locations.map((l, i) => (
            <Location location={l} key={i} />
          ))}

          {adding ? (
            <Fragment>
              <ListItem key="search">
                <StandaloneSearchBox
                  onLoad={(ref) => (search.current = ref)}
                  onPlacesChanged={() => setPlace(search.current.getPlaces())}
                >
                  <TextField />
                </StandaloneSearchBox>
              </ListItem>
              <ListItem key="actions">
                <IconButton color="secondary" onClick={cancel}>
                  <CancelIcon />
                </IconButton>
                {["home", "work", "place"].map((t) => (
                  <IconButton
                    key={t}
                    color="primary"
                    onClick={() => addPlace(t)}
                    disabled={place ? undefined : true}
                  >
                    {locationIcon[t]}
                  </IconButton>
                ))}
              </ListItem>
            </Fragment>
          ) : (
            <ListItem
              button
              onClick={() => setAdding({ query: "", type: "place" })}
              key="add"
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>Add location</ListItemText>
            </ListItem>
          )}
        </List>
      </Expansion>
      <Expansion title="Infection status" />
      <Button variant="contained" color="primary" className={classes.action}>
        Submit
      </Button>
    </Container>
  );
};

export default Panel;
