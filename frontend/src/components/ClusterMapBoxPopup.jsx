import { useEffect } from "react";
import { Popup } from "react-map-gl";
import { Link } from "react-router-dom";
function ClusterMapBoxPopup({
  circleCoords,
  setShowPopup,
  title,
  location,
  id,
}) {
  // console.log(campground);
  useEffect(() => {
    setShowPopup(true);
    // return () => {
    //   setShowPopup(false);
    //   console.log("unmounted");
    // };
  }, [setShowPopup]);
  return (
    <Popup
      longitude={circleCoords.lng || 0}
      latitude={circleCoords.lat || 0}
      anchor="bottom"
      onClose={() => setShowPopup(false)}
      // closeOnClick={true}
      closeOnMove={true}
    >
      <Link to={`/campgrounds/${id}`}>
        <h6>{title}</h6>
      </Link>
      <p>{location}</p>
    </Popup>
  );
}

export default ClusterMapBoxPopup;
