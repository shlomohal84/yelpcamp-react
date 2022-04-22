// Create new campground page

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

function NewCampground({ username }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    previewSource: "",
    validated: false,
  });

  const { title, location, price, description, validated, previewSource } =
    state;

  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  /* ==> Config file upload */
  const handleFileInputChange = evt => {
    const file = evt.target.files[0];
    previewFile(file);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setState(prevState => ({
        ...prevState,
        previewSource: reader.result,
      }));
    };
  };

  const uploadImage = async base64EncodedImage => {
    try {
      await fetch("/campgrounds/new", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  /* <== Config file upload */

  const handleSubmit = async evt => {
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setState(prevState => ({ ...prevState, validated: false }));
    } else {
      evt.preventDefault();
      if (previewSource) {
        await uploadImage(previewSource);
      }

      const response = await axios.post("/campgrounds/new", {
        campground: {
          ...state,
          geometry: {
            type: "Point",
          },
          username: username,
        },
      });
      if (!response.data) return console.error("Can't find a location!");
      console.log(response.data);
      navigate(`/campgrounds/${response.data._id}`);
    }
    setState(prevState => ({ ...prevState, validated: true }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    const getAuth = async () => {
      try {
        fetch("/isUserAuth", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
          .then(res => res.json())
          .then(data => (!data.isLoggedIn ? navigate("/login") : null));
      } catch (error) {
        console.error(error);
      }
    };
    getAuth();
  }, [navigate]);

  return (
    <div className="NewCampground row">
      <h1 className="text-center">New Campground</h1>
      <div className="col-md-6 col-xl-9 mx-auto">
        <Form
          noValidate
          validated={validated}
          action="/campgrounds/new"
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
      {previewSource && (
        <div>
          <img
            src={previewSource}
            alt={previewSource}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      )}
      <footer>
        <Link to="/campgrounds">Back to All Campgrounds</Link>
      </footer>
    </div>
  );
}

export default NewCampground;
