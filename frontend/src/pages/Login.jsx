import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ toggleLogin }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;
  const navigate = useNavigate();
  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onSubmit = async evt => {
    evt.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      if (!response.data.loginStatus) {
        console.log(response.data);
        return toggleLogin(false, {});
      }
      toggleLogin(response.data.loginStatus, {
        username: response.data.username,
        id: response.data.id,
      });
      console.log(response.data);
      navigate("/campgrounds");
    } catch (error) {
      console.log(error);
    }
  };
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
                onSubmit={onSubmit}
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={username}
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
                    onChange={handleInputChange}
                    value={password}
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
