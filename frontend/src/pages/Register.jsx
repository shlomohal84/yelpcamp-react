// User registration page
import { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { register } from "../api/userAuth";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
// Component imports
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";
import LoadingSpinner from "../components/LoadingSpinner";

function Register({ handleAlert, mainError, mainSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // username: "John Doe",
    // email: "j@doe.com",
    // password: "1234",
    // confirmPassword: "1234",
    successMessage: null,
    errorMessage: null,
    loading: false,
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    successMessage,
    errorMessage,
    loading,
  } = formData;

  useEffect(() => {
    if (isAuthenticated()) {
      handleAlert("Already logged in", null);
      navigate("/campgrounds");
    }
  }, [navigate, handleAlert]);

  const handleInputChange = evt => {
    setFormData(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
      successMessage: "",
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setFormData(prevState => ({
        ...prevState,
        errorMessage: "All fields are required",
      }));
    } else if (!isEmail(email)) {
      setFormData(prevState => ({
        ...prevState,
        errorMessage: "Invalid Email",
      }));
    } else if (!equals(password, confirmPassword)) {
      setFormData(prevState => ({
        ...prevState,
        errorMessage: "Passwords do not match",
      }));
    } else {
      const { username, email, password } = formData;

      const data = { username, email, password };
      setFormData(prevState => ({ ...prevState, loading: true }));

      register(data)
        .then(response => {
          // console.log("axios sign up success", response);
          setFormData(prevState => ({
            ...prevState,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            errorMessage: "",
            successMessage: response.data.successMessage,
          }));
          handleAlert(null, response.data.successMessage);
          navigate("/login");
        })
        .catch(err => {
          console.log("Axios signup error\n", err.response.data.errorMessage);
          setFormData(prevState => ({
            ...prevState,
            loading: false,
            successMessage: "",
            errorMessage: err.response.data.errorMessage,
          }));
        });
    }
  };
  const renderRegisterForm = () => (
    <div className="card shadow">
      <img
        src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
        alt=""
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">Register</h5>

        <form
          action="/register"
          method="POST"
          className="validated-form"
          noValidate
          onSubmit={evt => handleSubmit(evt)}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={username}
              autoFocus
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={email}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={password}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleInputChange}
              value={confirmPassword}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <button
            type="submit"
            value="submit"
            className="btn btn-success btn-block w-100"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="row">
      {errorMessage && (
        <ShowErrorMessage msg={errorMessage} handleAlert={handleAlert} />
      )}
      {successMessage && (
        <ShowSuccessMessage msg={successMessage} handleAlert={handleAlert} />
      )}
      <div className="col-md-6 col-lg-4 mx-auto">{renderRegisterForm()}</div>
    </div>
  );
}

export default Register;
