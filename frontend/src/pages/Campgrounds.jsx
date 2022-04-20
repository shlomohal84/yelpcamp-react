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

      <h1>All Campgrounds</h1>
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
