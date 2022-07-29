// Campground content page

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCampgroundContent } from "../api/campgrounds";
import CampgroundCarousel from "../components/CampgroundCarousel";
import DetailsCard from "../components/DetailsCard";
import Reviews from "../components/Reviews";
import MapBox from "../components/MapBox";
import LoadingSpinner from "../components/LoadingSpinner";

function CampgroundContent() {
  const [state, setState] = useState({
    campground: {},
    author: {},
    coordinates: [0, 0],
    images: [],
    loading: false,
    errorMessage: null,
    successMessage: null,
    reviews: [],
  });
  const {
    campground,
    author,
    coordinates,
    images,
    reviews,
    loading,
    errorMessage,
    successMessage,
  } = state;
  const { id } = useParams();

  useEffect(() => {
    const loadCampgroundContent = () => {
      const data = { id };
      getCampgroundContent(data)
        .then(response => {
          setState(prevState => ({
            ...prevState,
            author: response.data.campground.author,
            coordinates: response.data.campground.geometry.coordinates,
            campground: response.data.campground,
            images: response.data.campground.images,
            reviews: response.data.campground.reviews,
            loading: false,
            successMessage: response.data.successMessage,
            errorMessage: null,
          }));
        })
        .catch(err => {
          setState(prevState => ({
            ...prevState,
            loading: false,
            errorMessage: err.response.data.errorMessage,
            successMessage: null,
          }));
          console.log(
            "Campgrounds list loading error:\n",
            err.response.data.errorMessage
          );
        });
    };
    loadCampgroundContent();
  }, [id]);

  return (
    <div className="row">
      <div className="col-6">
        <CampgroundCarousel images={images} />
        <DetailsCard campground={campground} author={author} />
      </div>
      <div className="col-6">
        <MapBox
          lng={coordinates[0]}
          lat={coordinates[1]}
          zoom={11}
          campground={campground}
        />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
}

export default CampgroundContent;
