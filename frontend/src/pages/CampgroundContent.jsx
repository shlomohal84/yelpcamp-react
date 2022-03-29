import { useState, useEffect } from "react";
import { useParams /* useLocation */ } from "react-router-dom";
import axios from "axios";

import CampgroundCarousel from "../components/CampgroundCarousel";
import DetailsCard from "../components/DetailsCard";
import Reviews from "../components/Reviews";
import MapBox from "../components/MapBox";

function CampgroundContent({ currentUser, isLoggedIn }) {
  const [campground, setCampground] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // const { pathname } = useLocation();
  useEffect(() => {
    async function getApi() {
      try {
        const response = await axios.get(`/campgrounds/${id}`);
        setCampground(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getApi();
  }, [id]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const { coordinates } = campground.geometry;

  return (
    <div className="row">
      <div className="col-6 pe-1">
        <CampgroundCarousel campground={campground} />
        <DetailsCard
          campground={campground}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="col-6 ps-1">
        {loading ? null : (
          <MapBox
            lng={coordinates[0]}
            lat={coordinates[1]}
            zoom={9}
            campground={campground}
          />
        )}
        <Reviews
          campground={campground}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}

export default CampgroundContent;
