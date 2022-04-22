//User login page

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
function Login({ toggleLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleLogin = evt => {
    evt.preventDefault();

    const form = evt.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
      });
    toggleLogin(user.username);
    navigate("/campgrounds");
  };

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data => (data.isLoggedIn ? toggleLogin(data.username) : null));
  }, [toggleLogin]);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <div className="Login container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form
                action="/login"
                method="POST"
                className="validated-form"
                onSubmit={evt => handleLogin(evt)}
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
                    autoFocus
                    required
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
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button
                  className="btn btn-success btn-block w-100"
                  type="submit"
                  value="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
