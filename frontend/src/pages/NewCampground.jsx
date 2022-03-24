import React from "react";

function NewCampground() {
  return (
    <div className="row">
      <h1 className="text-center">New Campground</h1>
      <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
        <form
          action="/campgrounds/new"
          method="POST"
          noValidate
          className="validated-form"
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="campground[title]"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              className="form-control"
              type="text"
              id="location"
              name="campground[location]"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="price">
              Campground Price
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="price-label">
                $
              </span>
              <input
                type="text"
                className="form-control"
                id="price"
                name="campground[price]"
                placeholder="0.00"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              style={{ resize: "none" }}
              className="form-control"
              type="text"
              id="description"
              name="campground[description]"
              required
            ></textarea>
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload image(s)
            </label>
            <input
              className="form-control"
              type="file"
              name="images"
              id="image"
              multiple
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Add Campground</button>
          </div>
        </form>
        <footer>
          <a href="/campgrounds">Back to All Campgrounds</a>
        </footer>
      </div>
    </div>
  );
}

export default NewCampground;
