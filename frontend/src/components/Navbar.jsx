//Page navbar header
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar({ pathname, username, toggleLogin }) {
  const navigate = useNavigate();
  const logout = async () => {
    toggleLogin(null);
    localStorage.removeItem("token");
    // navigate("/login");
  };

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data =>
        data.isLoggedIn ? toggleLogin(data.username) : toggleLogin(null)
      );

    // return () => toggleLogin(prevState => prevState);
  }, [toggleLogin]);

  return pathname !== "/" ? (
    <nav
      className={"navbar navbar-expand-lg navbar-dark bg-success sticky-top"}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fst-italic" to="/campgrounds">
          YelpCamp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/campgrounds">
                Campgrounds
              </Link>
            </li>
            {username ? (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/campgrounds/new">
                  Create Campground
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto">
            {username ? (
              <li className="nav-item">
                <Link
                  onClick={logout}
                  className="nav-link text-white"
                  to="/login"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    // onClick={() => toggleLogin(true)}
                    className="nav-link text-white"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  ) : null;
}

export default Navbar;
