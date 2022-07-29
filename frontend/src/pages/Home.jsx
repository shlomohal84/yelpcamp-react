// landing page
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";

import "./pages_styles/Home.css";
function Home({ navigate, handleAlert }) {
  const handleLogout = evt => {
    evt.preventDefault();
    handleAlert(null, "Logged out successfully");
    logout(() => {
      navigate("/login");
    });
  };
  return (
    <main className="Home">
      <header className="mb-auto fs-3 ">
        <nav className="nav justify-content-center">
          <h3 className="float-md-start mb-0">YelpCamp</h3>
          <Link className="nav-link text-light" aira-current="page" to="/">
            Home
          </Link>
          <Link className="nav-link text-light" to="/campgrounds">
            Campgrounds
          </Link>
          {!isAuthenticated() && (
            <>
              <Link className="nav-link text-light" to="/login">
                Login
              </Link>
              <Link className="nav-link text-light" to="/register">
                Register
              </Link>
            </>
          )}

          {isAuthenticated() && (
            <Link className="nav-link text-light" to="" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </nav>
      </header>
    </main>
  );
}

export default Home;
