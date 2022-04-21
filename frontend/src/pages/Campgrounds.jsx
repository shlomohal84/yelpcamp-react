// Campgrounds index page

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClusterMapBox from "../components/ClusterMapBox";

function Campgrounds({ isLoggedIn }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    async function getApi() {
      try {
        const response = await axios({
          method: "GET",
          url: "/campgrounds",
        });
        setCampgrounds(response.data);
      } catch (error) {
        setCampgrounds([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getApi();
  }, []);
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <ClusterMapBox campgrounds={campgrounds} />

      <div
        className="d-flex align-items-center w-25 border-bottom border-top justify-content-center mx-auto rounded bg-opacity-50 text-success"
        style={{ height: "3em" }}
      >
        <h5 className="text-center m-0 fw-bold">
          Found {campgrounds.length && campgrounds.length} campgrounds
        </h5>
      </div>
      <div>
        <Link to={isLoggedIn ? "/campgrounds/new" : "/login"}>
          Add Campground
        </Link>
      </div>
      {campgrounds.map(campground => {
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
                  <h5>{/* <{%=elm.properties.popUpMarkup %>} */}</h5>
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
      })}
    </>
  );
}

export default Campgrounds;
