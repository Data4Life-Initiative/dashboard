import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHeatmapData,
  selectLocations,
  selectCenter,
  selectZoom,
  fetchHotspotData,
  mapLoaded,
} from "./mapSlice";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import {MenuItem, Select} from "@material-ui/core";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';



const libraries = ["places", "visualization"];

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAK1IYua9oUx47u1mlHFWO_gTMisITDIFg',
    libraries,
  });
  const data = useSelector(selectHeatmapData);
  const locations = useSelector(selectLocations);
  const center = useSelector(selectCenter);
  const zoom = useSelector(selectZoom);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotspotData());
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) dispatch(mapLoaded());
  }, [dispatch, isLoaded]);


  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 20,
      position: 'relative',
      backgroundColor: "#f2f2f2",
      border: '1px',
      borderColor: '#333',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      boxShadow: '0.5px 0.5px',
      '&:focus': {
        borderRadius: 20,
        backgroundColor: "#f2f2f2",
        borderColor: '#333',
      },
    },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const mapCenter = center;
  const renderMap = () => {
    const { google } = window;
    const options = {
      imagePath: `${process.env.PUBLIC_URL}/m`,
      zIndex: 1,
    };
    return (
      <Fragment>
        <Select style={{ marginLeft: 15, position: "absolute", zIndex: "1000", marginTop: "10px", width: "60%"}} input={<BootstrapInput />} value={1}>
          <MenuItem value={1}>COVID-19 PANDEMIC</MenuItem>
          <MenuItem value={2}>SEASONAL FLU</MenuItem>
        </Select>
        <GoogleMap
          id="example-map"
          zoom={zoom}
          center={mapCenter}
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          options={{
            mapTypeControl: false,
            zoomControlOptions: { position: 8 },
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          {/* <HeatmapLayer
            data={R.map((p) => new google.maps.LatLng(p.lat, p.lng), data)}
          /> */}

          {locations.map((l, i) => (
            <Marker
              key={i}
              position={l.latLng}
              icon={`${process.env.PUBLIC_URL}/location.png`}
              zIndex={5}
            />
          ))}
          <MarkerClusterer options={options}>
            {(clusterer) =>
              data.map((p, i) => (
                <Marker
                  key={i}
                  position={new google.maps.LatLng(p.lat, p.lng)}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
          {/* {props.children} */}
        </GoogleMap>
      </Fragment>
    );
  };
  if (loadError) {
    return <h1>{loadError.message}</h1>;
  }
  return isLoaded ? renderMap() : <h1>Loading...</h1>;
};

export default MapComponent;
