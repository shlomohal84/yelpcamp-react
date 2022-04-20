// Left column container on single compgraound content

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailsCard({ campground, currentUser, isLoggedIn }) {
  const navigate = useNavigate();
  const handleDelete = async evt => {
    evt.preventDefault();
    await axios.delete(`/campgrounds/${campground._id}`);
    navigate("/campgrounds");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{campground.title}</h5>
        <p className="card-text">{campground.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Submitted By: {campground.author.username}
        </li>
        <li className="list-group-item text-muted">{campground.location}</li>
        <li className="list-group-item">{`$${campground.price}/night`}</li>
      </ul>
      {currentUser && currentUser.id === campground.author._id && (
        <div className="card-body">
          <Link
            to={`/campgrounds/${campground._id}/edit`}
            className="card-link btn btn-info"
          >
            Edit
          </Link>
          {(currentUser || isLoggedIn) && (
            <form
              className="d-inline"
              action={`/campgrounds/${campground._id}`}
              method="DELETE"
              onSubmit={handleDelete}
            >
              <button className="btn btn-danger">Delete</button>
            </form>
          )}
        </div>
      )}
      <div className="card-footer">
        <span className="col-3">Posted At: </span>
        <span className="text-muted">
          {` ${new Date(campground.createdAt).toLocaleString("en-gb")}`}
        </span>
      </div>
      <div className="card-footer flex-row">
        <span className="col-3">Updated At: </span>
        <span className="text-muted">
          {`${new Date(campground.updatedAt).toLocaleString("en-gb")}`}
        </span>
      </div>
    </div>
  );
}

export default DetailsCard;
