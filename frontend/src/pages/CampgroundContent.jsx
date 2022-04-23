// Campground content page

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import CampgroundCarousel from "../components/CampgroundCarousel";
import DetailsCard from "../components/DetailsCard";
import Reviews from "../components/Reviews";
import MapBox from "../components/MapBox";
import LoadingSpinner from "../components/LoadingSpinner";

function CampgroundContent({ username }) {
  const navigate = useNavigate();
  const [campground, setCampground] = useState({});
  const [coordinates, setCoordinates] = useState([]);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getApi = useCallback(
    async () => {
      try {
        const response = await axios.get(`/campgrounds/${id}`);
        if (response.data.error) return navigate("/*");
        setCampground(response.data);
        setCoordinates(response.data.geometry.coordinates);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [id, navigate],
    navigate
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getApi();
  }, [getApi]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="row">
      <div className="col-6">
        <CampgroundCarousel campground={campground} username={username} />
        <DetailsCard campground={campground} username={username} />
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
        <Reviews getApi={getApi} campground={campground} username={username} />
      </div>
    </div>
  );
}

export default CampgroundContent;
