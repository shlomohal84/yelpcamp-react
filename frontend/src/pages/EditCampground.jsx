import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

function EditCampground({ currentUser, currentCampgroundId }) {
  const { pathname } = useLocation();
  const params = useParams();
  const [state, setState] = useState({ files: null });
  const { title, location, price, description, images, loading } = state;

  useEffect(() => {
    // console.log(currentPath);
    async function getApi() {
      try {
        const response = await axios.get(`/campgrounds/${params.id}`);
        let { title, location, price, description } = response.data;
        setState(prevState => ({
          ...prevState,
          campground: response.data,
          title: title,
          location: location,
          price: price,
          description: description,
          images: [
            {
              url: "https://res.cloudinary.com/snackeater/image/upload/v1648143343/YelpCamp/IMG_20210530_232316_fapoqk.jpg",
              filename: "angels",
            },
          ],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    }
    getApi();
  }, [currentCampgroundId, pathname, params.id]);

  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleFileInputChange = evt => {
    setState(prevState => ({ ...prevState, images: evt.target.files[0] }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const response = await axios.put(pathname, {
      title,
      location,
      price,
      description,
      images,
      loading,
    });
    console.log(response.data);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="row">
      <h1 className="text-center">Edit Campground</h1>
      <div className="col-md-6 offset-md-3 col-xl-6">
        <form
          action={`/campgrounds/${currentCampgroundId}/edit`}
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
              id="images"
              multiple
              required
              onChange={handleFileInputChange}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Edit Campground</button>
          </div>
        </form>
        <footer>
          <Link to="/campgrounds">Back to All Campgrounds</Link>
        </footer>
      </div>
    </div>
  );
}

export default EditCampground;
