import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NewCampground({ currentUser }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    location: "",
    price: 0,
    description: "",
    images: [],
  });

  const { title, location, price, description, images } = state;
  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const response = await axios.post("/campgrounds/new", {
      campground: {
        ...state,
        geometry: {
          type: "Point",
        },
        author: currentUser.id,
      },
    });
    navigate("/campgrounds");
    console.log(response);
  };

  return (
    <div className="row">
      <h1 className="text-center">New Campground</h1>
      <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
        <form
          action="/campgrounds/new"
          method="POST"
          className="validated-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={handleInputChange}
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
              name="location"
              required
              value={location}
              onChange={handleInputChange}
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
                name="price"
                placeholder="0.00"
                required
                value={price}
                onChange={handleInputChange}
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
              name="description"
              required
              value={description}
              onChange={handleInputChange}
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
              value={images}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Add Campground</button>
          </div>
        </form>
        <footer>
          <Link to="/campgrounds">Back to All Campgrounds</Link>
        </footer>
      </div>
    </div>
  );
}

export default NewCampground;
