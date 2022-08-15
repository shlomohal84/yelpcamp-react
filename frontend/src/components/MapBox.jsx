import Map, { Marker } from "react-map-gl";

import "./component_styles/MapBox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

function MapBox({ coordinates }) {
  // const coordinates = geometry && geometry.coordinates;
  const lng = coordinates[0];
  const lat = coordinates[1];
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  const [viewState, setViewState] = useState({
    zoom: 11,
  });
  const handleZoom = evt => {
    setViewState(evt.viewState);
  };

  return (
    <>
      <Map
        longitude={lng}
        latitude={lat}
        zoom={viewState.zoom}
        onMove={handleZoom}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        // boxZoom={true}
        // scrollZoom={true}
        dragPan={false}
        // doubleClickZoom={true}
        id="map"
        className="mapboxgl-map"
      >
        <Marker longitude={lng} latitude={lat} /*  zoom={zoom} */></Marker>
      </Map>
    </>
  );
}

export default MapBox;

// // Mapbox showing campground locationon
// // on the right column of campground content
// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";

// import "mapbox-gl/dist/mapbox-gl.css";
// import "./component_styles/MapBox.css";
// import LoadingSpinner from "./LoadingSpinner";

// function MapBox({ lat, lng, zoom }) {
//   mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

//   //eslint-disable-next-line
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       if (map.current) return; // initialize map only once
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [lng, lat],
//         zoom: zoom,
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [lat, lng, zoom]);

//   if (loading)
//     return (
//       <>
//         <div ref={mapContainer} />
//       </>
//     );

//   return <div ref={mapContainer} id="map" className="mapboxgl-map" />;
// }

// export default MapBox;
