import { useState, useEffect, useCallback } from "react";
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
  const getApi = useCallback(async () => {
    try {
      const response = await axios.get(`/campgrounds/${id}`);
      setCampground(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getApi();
  }, [getApi]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  const { coordinates } = campground.geometry;

  return (
    <div className="row">
      <div className="col-6">
        <CampgroundCarousel campground={campground} />
        <DetailsCard
          campground={campground}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="col-6">
        {loading ? null : (
          <MapBox
            lng={coordinates[0]}
            lat={coordinates[1]}
            zoom={11}
            campground={campground}
          />
        )}
        <Reviews
          getApi={getApi}
          campground={campground}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}

export default CampgroundContent;
