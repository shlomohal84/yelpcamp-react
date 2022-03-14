import React from "react";

function CampgroundContent() {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div
            id="campgroundCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* <% if(campground.images.length> 1){%> */}
            <div className="carousel-indicators">
              {/* <%campground.images.forEach((elm,idx)=>{ %> */}
              <button
                type="button"
                data-bs-target="#campgroundCarousel"
                data-bs-slide-to="<%=idx%>"
                aria-current="true"
                aria-label="Slide"
                className="<%=idx===0 ? " /* active" : '' %>" */
              >
                {" "}
              </button>
              {/*   <%}) %> */}
            </div>
            {/*  <% }%> */}
            <div className="carousel-inner">
              {/* <% campground.images.forEach((elm,idx)=>{ %> */}
              <div
                className="carousel-item <%=idx === 0 ? " /*  active": '' %>" */
              >
                <img
                  /* src="<%=elm.url %>" */ className="d-block w-100"
                  alt="<%=elm.title %>"
                />
              </div>
              {/*  <% })%> */}
            </div>
            {/* <% if(campground.images.length> 1){%> */}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#campgroundCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#campgroundCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>

            {/*  <% }%> */}
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{/* <%=campground.title%> */}</h5>
              <p className="card-text">{/* <%=campground.description %> */}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {" "}
                Submitted By: {/* <%=campground.author.username %> */}
              </li>
              <li className="list-group-item text-muted">
                {/* <%=campground.location %> */}
              </li>
              <li className="list-group-item">
                {/* $<%=campground.price %>/night */}
              </li>
            </ul>
            {/* <%if (currentUser && campground.author.equals(currentUser._id)){ %> */}
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
            {/* <% }%> */}
            <div className="card-footer text-muted">
              {/* <%=Math.floor(Math.random() * 30)+1 %> days ago */}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div id="map" /*  style='width: 400px; height: 300px;' */></div>
          {/* <%if (currentUser){ %> */}
          <h2>Leave a review</h2>
          <form
            action="/campgrounds/<%=campground._id %>/reviews"
            method="POST"
            className="mb-3 validated-form"
            noValidate
          >
            <div className="mb-3">
              <fieldset className="starability-basic">
                <input
                  type="radio"
                  id="no-rate"
                  className="input-no-rate"
                  name="review[rating]"
                  value="1" /* checked */
                  aria-label="No rating."
                />
                <input
                  type="radio"
                  id="first-rate1"
                  name="review[rating]"
                  value="1"
                />
                <label htmlFor="first-rate1" title="Terrible">
                  1 star
                </label>
                <input
                  type="radio"
                  id="first-rate2"
                  name="review[rating]"
                  value="2"
                />
                <label htmlFor="first-rate2" title="Not good">
                  2 stars
                </label>
                <input
                  type="radio"
                  id="first-rate3"
                  name="review[rating]"
                  value="3"
                />
                <label htmlFor="first-rate3" title="Average">
                  3 stars
                </label>
                <input
                  type="radio"
                  id="first-rate4"
                  name="review[rating]"
                  value="4"
                />
                <label htmlFor="first-rate4" title="Very good">
                  4 stars
                </label>
                <input
                  type="radio"
                  id="first-rate5"
                  name="review[rating]"
                  value="5"
                />
                <label htmlFor="first-rate5" title="Amazing">
                  5 stars
                </label>
              </fieldset>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="body">
                Review text:
              </label>
              <textarea
                className="form-control"
                name="review[body]"
                id="body"
                cols="30"
                rows="3"
                required
              ></textarea>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
          {/* <%} %> */}
          {/* <% htmlFor (let elm of campground.reviews){ %> */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                {/* <%=elm.author.username %>  */}
              </h5>
              <p className="starability-result" data-rating="<%=elm.rating %>">
                {" "}
                Rated: 3 stars{" "}
              </p>
              <h6 className="card-subtitle mb-2 text-muted"> </h6>
              <p className="card-text">{/* Review: <%=elm.body %> */} </p>
              {/* <%if (currentUser && elm.author.equals(currentUser._id)){ %> */}
              <form
                action="/campgrounds/<%=campground._id%>/reviews/<%=elm._id%>?_method=DELETE"
                method="POST"
              >
                <button className="btn btn-sm btn-danger">Delete</button>
              </form>
              {/* <%}%> */}
            </div>
          </div>
          {/* <%}%> */}
        </div>
      </div>
    </>
  );
}

export default CampgroundContent;
