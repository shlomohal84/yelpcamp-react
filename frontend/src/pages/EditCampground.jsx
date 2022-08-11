// Create new campground page

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
// import { createCampground } from "../api/campgrounds";
import { getCampgroundContent, editCampground } from "../api/campgrounds";
import { isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import isFloat from "validator/lib/isFloat";

//Component imports
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";
import LoadingSpinner from "../components/LoadingSpinner";

function EditCampground({ handleAlert }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    title: "",
    location: "",
    price: "",
    initialImages: [],
    deletedImages: [],
    description: "",
    previewSource: [],
    successMessage: null,
    errorMessage: null,
    loading: false,
  });
  const {
    user,
    title,
    location,
    price,
    description,
    initialImages,
    deletedImages,
    previewSource,
    errorMessage,
    successMessage,
    loading,
  } = formData;

  const { id } = useParams();
  useEffect(() => {
    if (!isAuthenticated()) {
      handleAlert("Unauthorized. Please login", null);
      navigate("/login");
    }
    const getAuthorId = () => {
      const data = { id };
      getCampgroundContent(data)
        .then(response => {
          const { campground } = response.data;
          if (campground.author._id !== user._id) {
            handleAlert(
              "Unauthorized. User is not this campground author",
              null
            );
            navigate("/campgrounds/" + id);
          }
          setFormData(prevState => ({
            ...prevState,
            title: campground.title,
            location: campground.location,
            price: campground.price,
            description: campground.description,
            initialImages: campground.images,
          }));
        })
        .catch(err => {
          console.log(err);
          handleAlert(err.response.data.errorMessage, null);
        });
    };
    getAuthorId();
  }, [navigate, handleAlert, id, user._id]);

  const handleInputChange = evt => {
    if (evt.target.name === "price") {
      for (let num of evt.target.value) {
        if (!(num >= 0 || num <= 9 || num === ".")) {
          return evt.target.value.slice(0, evt.target.value.length - 1);
        }
      }
    }
    setFormData(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  /* ==> Config file upload */
  const handleFileInputChange = evt => {
    const files = evt.target.files;
    Object.values(files).forEach(f => {
      previewFile(f);
    });
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData(prevState => ({
        ...prevState,
        previewSource: [...prevState.previewSource, reader.result],
      }));
      // setFormData(prevState => ({
      //   ...prevState,
      //   previewSource: reader.result,
      // }));
    };
  };

  // const uploadImage = async base64EncodedImage => {
  //   try {
  //     await fetch("/campgrounds/new", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         data: base64EncodedImage,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  /* <== Config file upload */

  const handleSubmit = evt => {
    setFormData(prevState => ({ ...prevState, loading: true }));
    evt.preventDefault();
    const data = {
      id,
      title,
      location,
      price,
      description,
      initialImages,
      deletedImages,
      previewSource,
    };
    editCampground(data)
      .then(response => {
        console.log(response.data.successMessage);
        handleAlert(null, response.data.successMessage);
        setFormData(prevState => ({
          ...prevState,
          loading: false,
          deletedImages: [],
        }));
        navigate("/campgrounds/" + id);
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        setFormData(prevState => ({
          ...prevState,
          errorMessage: err.response.data.errorMessage,
        }));
      });
  };

  //
  const handleDeletedImages = (img, idx) => {
    const filterImgs = initialImages.filter(elm => {
      if (initialImages[idx]._id === elm._id) {
        setFormData(prevState => ({
          ...prevState,
          deletedImages: [...prevState.deletedImages, elm.public_id],
        }));
      }
      return initialImages[idx]._id !== elm._id;
    });
    setFormData(prevState => ({
      ...prevState,
      initialImages: filterImgs,
    }));
  };
  //
  if (loading) return <LoadingSpinner />;
  return (
    <div className="EditCampground row">
      <h1 className="text-center">Edit Campground</h1>
      {errorMessage && <ShowErrorMessage msg={errorMessage} />}
      {successMessage && <ShowSuccessMessage msg={successMessage} />}
      <div className="col-md-6 col-xl-9 mx-auto">
        <Form
          noValidate
          method="PUT"
          className="needs-validation"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="title"
              required
              value={title}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label className="form-label">Location</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="location"
              required
              value={location}
              onChange={handleInputChange}
            />
            <Form.Text className="valid-feedback">Looks good!</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label className="form-label">Campground Price</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text
                id="inputGroupPrepend"
                className="input-group-text"
              >
                @
              </InputGroup.Text>
              <FormControl
                type="text"
                className="form-control"
                name="price"
                placeholder="0.00"
                required
                value={price}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="form-label">Description</Form.Label>
            <textarea
              style={{ resize: "none" }}
              className="form-control"
              type="text"
              name="description"
              required
              value={description}
              onChange={handleInputChange}
            ></textarea>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="file">
            <Form.Label className="form-label">Upload image(s)</Form.Label>
            <Form.Control
              className="form-control"
              type="file"
              name="file"
              onChange={handleFileInputChange}
              multiple
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="btn btn-success">
              Edit Campground
            </Button>
          </div>
        </Form>
      </div>
      <div className="row justify-content-center">
        {initialImages &&
          Array.isArray(initialImages) &&
          initialImages.map((img, idx) => {
            return (
              <div className="col-md-3" key={idx}>
                <div className="d-flex flex-column">
                  <div className="mx-auto">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeletedImages(img, idx)}
                    >
                      X
                    </button>
                  </div>
                  <div className="mx-auto">
                    <img
                      src={img.url}
                      alt={img.url}
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <footer>
        <Link to={`/campgrounds/${id}`}>Back to Campground</Link>
      </footer>
    </div>
  );
}

export default EditCampground;
