function DetailsCard({ campground }) {
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
      <div className="card-body">
        <a
          href="/campgrounds/<%=campground._id %>/edit"
          className="card-link btn btn-info"
        >
          Edit
        </a>
        <form
          className="d-inline"
          action="/campgrounds/<%=campground._id%>?_method=DELETE"
          method="POST"
        >
          <button className="btn btn-danger">Delete</button>
        </form>
      </div>
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
