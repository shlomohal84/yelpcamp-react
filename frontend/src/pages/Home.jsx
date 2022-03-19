import { Link } from "react-router-dom";
import "./page_styles/Home.css";
function Home({ isLoggedIn }) {
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
          {!isLoggedIn && (
            <>
              <Link className="nav-link text-light" to="/login">
                Login
              </Link>
              <Link className="nav-link text-light" to="/register">
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <Link className="nav-link text-light" to="/logout">
              Logout
            </Link>
          )}
        </nav>
      </header>
    </main>
  );
}

export default Home;
