import { Link } from "react-router-dom";

function Navbar({ pathname, isLoggedIn }) {
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
            <li className="nav-item">
              <Link className="nav-link text-white" to="/campgrounds/new">
                New Campground
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
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
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  // onClick={() => toggleLogin(false)}
                  className="nav-link text-white"
                  to="/login"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  ) : null;
}

export default Navbar;
