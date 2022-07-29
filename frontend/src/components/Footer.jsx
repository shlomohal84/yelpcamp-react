// Page footer

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Footer({ location }) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);

  const handleMouseOut = () => setHover(false);

  return (
    location.pathname !== "/" && (
      <footer className="footer bg-success text-white py-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="flex-direction-row d-flex justify-content-center">
              <div className="me-2">&copy; YelpCamp 2022 </div>
              <FontAwesomeIcon
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: hover ? "gray" : "white",

                  transition: "color 0.3s",
                }}
                icon={faArrowUp}
                onClick={() => window.scrollTo(0, 0)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </div>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
