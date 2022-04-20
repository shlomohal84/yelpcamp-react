// Backgrounds index top cluster map

import { useRef, useState, useEffect } from "react";
import { Map, Source, Layer } from "react-map-gl";
import {
  clusters,
  clusterCount,
  unclusteredPoint,
} from "./component_styles/clusterLayers";
import ClusterMapBoxPopup from "./ClusterMapBoxPopup";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function ClusterMapBox({ campgrounds }) {
  const mapRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [circleCoords, setCircleCoords] = useState({});
  const [geojson, setGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [campgroundData, setCampgroundData] = useState({});
  useEffect(() => {
    const assignData = () => {
      const arr = [];
      campgrounds.forEach(campground => {
        arr.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: campground.geometry.coordinates,
          },
          properties: {
            title: campground.title,
            location: campground.location,
            id: campground._id,
          },
        });
      });
      setGeojson(prevState => ({ ...prevState, features: arr }));
    };
    assignData();
  }, [campgrounds]);

  const onClick = evt => {
    const feature = evt.features[0];
    const clusterId = feature.properties.cluster_id;
    const circleId = feature.layer.id;
    const mapboxSource = mapRef.current.getSource("campgrounds");

    if (clusterId) {
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    } else if (circleId) {
      const { lngLat } = evt;
      setCircleCoords(lngLat);
      setCampgroundData({ ...evt.features[0].properties });
      showPopup ? setShowPopup(false) : setShowPopup(true);
    }
  };

  return (
    <Map
      initialViewState={{ latitude: 40.6699, longitude: -103.5917, zoom: 3 }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[clusters.id, unclusteredPoint.id]}
      onClick={onClick}
      ref={mapRef}
    >
      {showPopup && (
        <ClusterMapBoxPopup
          {...campgroundData}
          setShowPopup={setShowPopup}
          circleCoords={circleCoords}
        />
      )}
      <Source
        data={geojson}
        id="campgrounds"
        type="geojson"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusters} />
        <Layer {...clusterCount} />
        <Layer {...unclusteredPoint} />
      </Source>
    </Map>
  );
}
export default ClusterMapBox;
