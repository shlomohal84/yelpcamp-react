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
import { useCallback } from "react";
// import LoadingSpinner from "../components/LoadingSpinner";
function CampgroundContent({ mainError, mainSuccess, handleAlert }) {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    campground: {},
    author: {},
    coordinates: [0, 0],
    images: [],
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
    // loading,
    errorMessage,
    successMessage,
  } = state;
  // console.log(params);

  const { id } = useParams();

  const loadCampgroundContent = useCallback(() => {
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
  }, [id]);

  useEffect(() => {
    loadCampgroundContent();
  }, [id, loadCampgroundContent]);

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
      <div className="col-md-6">
        <CampgroundCarousel images={images} />
        <DetailsCard
          campground={campground}
          id={id}
          author={author}
          user={user}
          handleAlert={handleAlert}
        />
      </div>
      <div className="col-md-6">
        <MapBox /* zoom={11} */ coordinates={coordinates} />
        <div>
          <Reviews id={id} loadCampgroundContent={loadCampgroundContent} />
        </div>
      </div>
    </div>
  );
}

export default CampgroundContent;
