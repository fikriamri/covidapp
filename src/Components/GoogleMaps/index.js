import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default function MapPage(props) {
    const GoogleMapWrapper = withGoogleMap(props => (
      <GoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtJjcjFBzjxF908drCFRGAXBF-EvefsSo"
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={props.center}
        onClick={props.onMapClick}
        onDragEnd={props.onDragEnd}
        className="map"
      >
        <Marker {...props.markers} />
      </GoogleMap>
    ));

    return (
      <div className="map-component row-100">
        <br />
        <GoogleMapWrapper
          containerElement={<div style={{ height: `260px` }} />}
          mapElement={<div style={{ height: `260px` }} />}
          onMapClick={props.handleMapClick}
          onDragEnd={props.handleMapDrag}
          onMapLoad={props.handleMapLoad}
          markers={props.markers}
          center={props.center}
        />
        <div id="fix-marker"></div>

      </div>
    );
}