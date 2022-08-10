// Create new campground page

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { createCampground } from "../api/campgrounds";
import { isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import isFloat from "validator/lib/isFloat";

//Component imports
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";
import LoadingSpinner from "../components/LoadingSpinner";

function NewCampground({ handleAlert }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "something",
    location: "somewhere",
    price: "59.99",
    description: "efwefwepfew",
    previewSource: [],
    successMessage: null,
    errorMessage: null,
    loading: false,
  });
  const {
    title,
    location,
    price,
    description,
    previewSource,
    errorMessage,
    successMessage,
    loading,
  } = formData;

  useEffect(() => {
    if (!isAuthenticated()) {
      handleAlert("Unauthorized. Please login", null);
      navigate("/login");
    }
  }, [navigate, handleAlert]);

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
    evt.preventDefault();
    if (
      isEmpty(title) ||
      isEmpty(location) ||
      isEmpty(price) ||
      isEmpty(description)
    ) {
      setFormData(prevState => ({
        ...prevState,
        successMessage: null,
        errorMessage: "All inputs are required",
      }));
    } else if (!isFloat(price)) {
      setFormData(prevState => ({
        ...prevState,
        successMessage: null,
        errorMessage: "Invalid price value",
      }));
    } else if (price <= 0) {
      setFormData(prevState => ({
        ...prevState,
        successMessage: null,
        errorMessage: "Price input must be larger than 0 ",
      }));
    } else {
      setFormData(prevState => ({ ...prevState, loading: true }));

      const data = { title, location, price, description, previewSource };

      createCampground(data)
        .then(response => {
          handleAlert(null, response.data.successMessage);
          setFormData(prevState => ({
            ...prevState,
            successMessage: null,
            errorMessage: null,
          }));
          navigate("/campgrounds/" + response.data.campgroundId);
        })
        .catch(err => {
          console.log(
            "createCampground api error:\n",
            err.response.data.errorMessage
          );
          setFormData(prevState => ({
            ...prevState,
            successMessage: null,
            errorMessage: err.response.data.errorMessage,
          }));
        });
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   const getAuth = async () => {
  //     try {
  //       fetch("/isUserAuth", {
  //         headers: {
  //           "x-access-token": localStorage.getItem("token"),
  //         },
  //       })
  //         .then(res => res.json())
  //         .then(data => (!data.isLoggedIn ? navigate("/login") : null));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAuth();
  // }, [navigate]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="NewCampground row">
      <h1 className="text-center">New Campground</h1>
      {errorMessage && <ShowErrorMessage msg={errorMessage} />}
      {successMessage && <ShowSuccessMessage msg={successMessage} />}
      <div className="col-md-6 col-xl-9 mx-auto">
        <Form
          noValidate
          method="POST"
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
              Add Campground
            </Button>
          </div>
        </Form>
      </div>
      <div className="row">
        {previewSource &&
          Array.isArray(previewSource) &&
          previewSource.map((s, idx) => {
            return (
              <div className="col" key={idx}>
                <img
                  src={s}
                  alt={s}
                  style={{ height: "150px", width: "150px" }}
                />
              </div>
            );
          })}
      </div>
      <footer>
        <Link to="/campgrounds">Back to All Campgrounds</Link>
      </footer>
    </div>
  );
}

export default NewCampground;
