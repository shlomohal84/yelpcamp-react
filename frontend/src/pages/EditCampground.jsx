import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

import axios from "axios";

function EditCampground({ currentUser }) {
  //
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    file: "",
    validated: false,
    loading: true,
  });
  const { title, location, price, description, file, validated } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getApi() {
      try {
        const response = await axios.get(`/campgrounds/${id}`);
        const { title, location, price, description, file } = response.data;
        setState(prevState => ({
          ...prevState,
          title,
          location,
          price,
          description,
          file,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    }
    getApi();
  }, [id]);

  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async evt => {
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setState(prevState => ({ ...prevState, validated: false }));
    } else {
      evt.preventDefault();
      const response = await axios.put(`/campgrounds/${id}/edit`, {
        campground: {
          ...state,
          geometry: {
            type: "Point",
          },
          author: currentUser.id,
        },
      });

      if (!response.data) return console.error("Can't find a location!");
      navigate(`/campgrounds/${response.data._id}`);
    }
    setState(prevState => ({ ...prevState, validated: true }));
  };

  return (
    <div className="EditCampground row">
      <h1 className="text-center">Edit Campground</h1>
      <div className="col-md-6 col-xl-9 mx-auto">
        <Form
          noValidate
          validated={validated}
          action="/campgrounds/new"
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
              // value={file}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="btn btn-success">
              Apply Changes
            </Button>
          </div>
        </Form>
        <footer>
          <Link to="/campgrounds">Back to All Campgrounds</Link>
        </footer>
      </div>
    </div>
  );
}

export default EditCampground;
