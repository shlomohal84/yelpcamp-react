// Left column container on single compgraound content

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated, isUserAuthor } from "../helpers/auth";
import { deleteCampground } from "../api/campgrounds";
function DetailsCard({ campground, author, user, id }) {
  const [state, setState] = useState(null);

  const handleDelete = async evt => {
    evt.preventDefault();
    // if (isUserAuthor(id)) {
    const data = { id, author };
    deleteCampground(data)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    // }

    //   await axios.delete(`/campgrounds/${campground._id}`);
    //   navigate("/campgrounds");
  };

  const renderModifyButtons = () => {
    if (isAuthenticated() && author._id === user._id) {
      return (
        <div className="card-body">
          <Link
            to={`/campgrounds/${campground._id}/edit`}
            className="card-link btn btn-info"
          >
            Edit
          </Link>
          <form className="d-inline" method="DELETE" onSubmit={handleDelete}>
            <button className="btn btn-danger">Delete</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{campground.title}</h5>
        <p className="card-text">{campground.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Submitted By: {campground.author && campground.author.username}
        </li>
        <li className="list-group-item text-muted">{campground.location}</li>
        <li className="list-group-item">{`$${campground.price}/night`}</li>
      </ul>

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
      {renderModifyButtons()}
    </div>
  );
}

export default DetailsCard;
