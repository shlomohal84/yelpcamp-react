// Mapbox showing campground locationon
// on the right column of campground content
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./component_styles/MapBox.css";

function MapBox({ lat, lng, zoom }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  //eslint-disable-next-line
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, zoom]);

  return <div ref={mapContainer} id="map" className="mapboxgl-map" />;
}

export default MapBox;
