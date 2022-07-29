// Campgrounds index page
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";
import { getCampgrounds } from "../api/campgrounds";
// Component imports
import ClusterMapBox from "../components/ClusterMapBox";
import LoadingSpinner from "../components/LoadingSpinner";
// import LoadingSpinner from "../components/LoadingSpinner";
function Campgrounds({ mainError, mainSuccess, handleAlert }) {
  // const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    campgrounds: [],
    loading: true,
    errorMessage: null,
    successMessage: null,
  });
  const { campgrounds, loading, errorMessage, successMessage } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadCampgroundsList = () => {
      getCampgrounds()
        .then(response => {
          setState(prevState => ({
            ...prevState,
            campgrounds: response.data.campgrounds,
            loading: false,
            successMessage: response.data.successMessage,
            errorMessage: null,
          }));
        })
        .catch(err => {
          handleAlert(err.response.data.errorMessage, null);
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
    loadCampgroundsList();
  }, [handleAlert]);

  const renderCampgroundsList = () =>
    campgrounds.map(campground => {
      return (
        <div className="card mb-3" key={campground._id}>
          <div className="row">
            <div className="col-md-4">
              <img
                className="img-fluid"
                src={campground.images.length ? campground.images[0].url : ""}
                alt={campground.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{campground.title} </h5>
                <p className="card-text">{campground.description}</p>
                <p className="card-text">
                  <small className="text-muted">{campground.location}</small>
                </p>
                <Link
                  to={`/campgrounds/${campground._id}`}
                  className="btn btn-primary"
                >
                  View {campground.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <>
      {mainError && (
        <ShowErrorMessage msg={mainError} handleAlert={handleAlert} />
      )}
      {mainSuccess && (
        <ShowSuccessMessage msg={mainSuccess} handleAlert={handleAlert} />
      )}

      <ClusterMapBox campgrounds={campgrounds} />
      <div className="mt-3 w-50 mx-auto">
        {errorMessage && <ShowErrorMessage msg={"No campgrounds found"} />}
        {successMessage && <ShowSuccessMessage msg={successMessage} />}
        {/* <h5 className="text-center m-0 fw-bold">
          Found {campgrounds.length && campgrounds.length} campgrounds
        </h5> */}
      </div>
      <div>
        <Link to={"/campgrounds/new"}>Add Campground</Link>
      </div>
      {loading && <LoadingSpinner />}
      {renderCampgroundsList()}
    </>
  );
}

export default Campgrounds;
