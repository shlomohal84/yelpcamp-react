import { Link } from "react-router-dom";

import MapBox from "../components/MapBox";
function Campgrounds({ campgrounds }) {
  return (
    <>
      <MapBox lng={34.845452838230635} lat={32.32111744313199} zoom={10} />
      <main className="container mt-5 ">
        <h1>All Campgrounds</h1>
        <div>
          <Link to="/campgrounds/new">Add Campground</Link>
        </div>
        {campgrounds.map(campground => {
          return (
            <div className="card mb-3" key={campground._id}>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-fluid"
                    src={
                      campground.images.length ? campground.images[0].url : ""
                    }
                    alt={campground.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{campground.title} </h5>
                    <h5>{/* <{%=elm.properties.popUpMarkup %>} */}</h5>
                    <p className="card-text">{campground.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {campground.location}
                      </small>
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
      </main>
    </>
  );
}

export default Campgrounds;
