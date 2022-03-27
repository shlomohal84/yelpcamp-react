import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Footer({ pathname }) {
  return pathname !== "/" ? (
    <footer className="footer bg-success text-white py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="flex-direction-row d-flex justify-content-center">
            <div className="me-2">&copy; YelpCamp 2022 </div>
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
  ) : null;
}

export default Footer;
