import { useState, useEffect, useRef } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./component_styles/MapBox.css";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapBox({ lat, lng, zoom }) {
  //eslint-disable-next-line
  const [mapBoxValues, setMapBoxValues] = useState({
    lng,
    lat,
    zoom,
  });
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapBoxValues.lng, mapBoxValues.lat],
      zoom: mapBoxValues.zoom,
    });
  });
  return (
    <div className="container-lg">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default MapBox;
