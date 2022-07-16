//User login page

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import { login } from "../api/userAuth";
//component imports
import LoadingSpinner from "../components/LoadingSpinner";

//
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "admin",
    password: "1234",
    successMessage: null,
    errorMessage: null,
    loading: false,
  });
  const { username, password, successMessage, errorMessage, loading } =
    formData;

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/campgrounds");
    }
  }, [navigate]);

  const handleInputChange = evt => {
    setFormData(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    // handlePostRegisterMessage("")

    if (isEmpty(username) || isEmpty(password)) {
      setFormData(prevState => ({
        ...prevState,
        errorMessage: "All fileds are required",
      }));
    } else {
      const data = { username, password };

      setFormData(prevState => ({
        ...prevState,
        loading: true,
      }));

      login(data)
        .then(response => {
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated()) {
            console.log(response);
            navigate("/campgrounds");
          } else {
            setFormData(prevState => ({
              ...prevState,
              errorMessage: response.data.errorMessage,
            }));
          }
        })
        .catch(err => {
          setFormData(prevState => ({
            ...prevState,
            loading: false,
            errorMessage: err.response.data.errorMessage,
          }));
          console.log(
            "login api function error",
            err.response.data.errorMessage
          );
        });
    }
  };
  const renderLoginForm = () => {
    return (
      <div className="card shadow">
        <img
          src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <button className="btn btn-success btn-block w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className="Login container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          {loading && <LoadingSpinner />}
          {renderLoginForm()}
        </div>
      </div>
    </div>
  );
}

export default Login;
