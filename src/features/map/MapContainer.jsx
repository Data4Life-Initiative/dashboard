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

  const mapCenter = center;
  const renderMap = () => {
    const { google } = window;
    const options = {
      imagePath: `${process.env.PUBLIC_URL}/m`,
      zIndex: 1,
    };
    return (
      <Fragment>
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
