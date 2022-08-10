//User login page

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import isEmpty from "validator/lib/isEmpty";
import { login } from "../api/userAuth";
//component imports
import LoadingSpinner from "../components/LoadingSpinner";
import { ShowErrorMessage, ShowSuccessMessage } from "../components/Alerts";

//
function Login({ handleAlert, mainError, mainSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    successMessage: null,
    errorMessage: null,
    loading: false,
  });
  const { username, password, successMessage, errorMessage, loading } =
    formData;

  useEffect(() => {
    if (isAuthenticated()) {
      handleAlert("Already logged in", null);
      navigate("/campgrounds");
    }
  }, [handleAlert, navigate]);

  const handleInputChange = evt => {
    handleAlert(null, null);
    setFormData(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    handleAlert(null, null);

    // handlePostRegisterMessage("")

    if (isEmpty(username) || isEmpty(password)) {
      setFormData(prevState => ({
        ...prevState,
        errorMessage: "All fileds are required",
        successMessage: null,
      }));
    } else {
      const data = { username: username.toLowerCase(), password };
      setFormData(prevState => ({
        ...prevState,
        loading: true,
      }));

      login(data)
        .then(response => {
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated()) {
            handleAlert(
              null,
              `Logged in successfuly. Hello ${response.data.user.username}!`
            );
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
          // console.log(
          //   "login api function error:",
          //   err.response.data.errorMessage
          // );
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
          {loading ? (
            <LoadingSpinner />
          ) : (
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
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="row">
      {mainError && (
        <ShowErrorMessage msg={mainError} handleAlert={handleAlert} />
      )}
      {mainSuccess && (
        <ShowSuccessMessage msg={mainSuccess} handleAlert={handleAlert} />
      )}
      {errorMessage && (
        <ShowErrorMessage msg={errorMessage} handleAlert={handleAlert} />
      )}
      {successMessage && (
        <ShowSuccessMessage msg={successMessage} handleAlert={handleAlert} />
      )}
      <div className="col-md-6 col-lg-4 mx-auto">{renderLoginForm()}</div>
    </div>
  );
}

export default Login;
