// Campground content page

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCampgroundContent } from "../api/campgrounds";

//Component imports
import CampgroundCarousel from "../components/CampgroundCarousel";
import DetailsCard from "../components/DetailsCard";
import Reviews from "../components/Reviews";
import MapBox from "../components/MapBox";
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";
// import LoadingSpinner from "../components/LoadingSpinner";
function CampgroundContent({ mainError, mainSuccess, handleAlert }) {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    campground: {},
    author: {},
    coordinates: [0, 0],
    images: [],
    reviews: [],
    loading: false,
    errorMessage: null,
    successMessage: null,
  });
  const {
    user,
    campground,
    author,
    coordinates,
    images,
    reviews,
    // loading,
    errorMessage,
    successMessage,
  } = state;
  const { id } = useParams();
  useEffect(() => {
    const loadCampgroundContent = () => {
      const data = { id };
      getCampgroundContent(data)
        .then(response => {
          // console.log(response.data);
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
      {mainError && (
        <ShowErrorMessage msg={mainError} handleAlert={handleAlert} />
      )}
      {mainSuccess && (
        <ShowSuccessMessage msg={mainSuccess} handleAlert={handleAlert} />
      )}
      {errorMessage && (
        <ShowErrorMessage msg={errorMessage} handleAlert={handleAlert} />
      )}
      {successMessage && (
        <ShowSuccessMessage msg={successMessage} handleAlert={handleAlert} />
      )}
      <div className="col-6">
        <CampgroundCarousel images={images} />
        <DetailsCard
          campground={campground}
          id={id}
          author={author}
          user={user}
          handleAlert={handleAlert}
        />
      </div>
      <div className="col-6">
        <MapBox zoom={11} coordinates={coordinates} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
}

export default CampgroundContent;
