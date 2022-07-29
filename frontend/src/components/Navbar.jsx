//Page navbar header
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
function Navbar({ location, navigate, handleAlert }) {
  const handleLogout = evt => {
    logout(() => {
      evt.preventDefault();
      handleAlert(null, "Logged out successfully");
      navigate("/login");
    });
  };

  if (location.pathname !== "/") {
    return (
      <nav
        className={"navbar navbar-expand-md navbar-dark bg-success sticky-top"}
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
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/campgrounds/new">
                    Create Campground
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav ms-auto">
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link
                    to=""
                    onClick={handleLogout}
                    className="nav-link text-white"
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
    );
  }
}

export default Navbar;
