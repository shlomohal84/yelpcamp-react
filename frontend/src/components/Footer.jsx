import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="footer bg-dark py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="mx-auto w-auto">
            <span className="text-muted">&copy; YelpCamp 2022</span>
            <a as={Link} href="#">
              <FontAwesomeIcon
                className="badge bg-secondary fs-7"
                icon={faArrowUp}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
