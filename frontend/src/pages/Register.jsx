import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { username, password, email } = state;

  const handleInputChange = evt => {
    setState(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleRegistration = async evt => {
    evt.preventDefault(evt);
    const response = await axios.post("/register", { ...state });
    console.log(response);
    if (response.data.registerStatus) return navigate("/campgrounds");
  };
  return (
    <div className="Register container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
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
                onSubmit={handleRegistration}
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
                    required
                    autoFocus
                    value={username}
                    onChange={handleInputChange}
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
                    required
                    value={email}
                    onChange={handleInputChange}
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
                    value={password}
                    onChange={handleInputChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button className="btn btn-success btn-block w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
