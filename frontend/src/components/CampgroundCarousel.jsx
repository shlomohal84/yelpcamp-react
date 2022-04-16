function CampgroundCarousel({ campground }) {
  return (
    <div
      style={{ height: "300px" }}
      id="campgroundCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {campground.images.length > 1 && (
        <div className="carousel-indicators">
          {campground.images.map((image, idx) => (
            <button
              type="button"
              data-bs-target="#campgroundCarousel"
              data-bs-slide-to={idx}
              aria-current="true"
              aria-label="Slide"
              className={idx === 0 ? "active" : ""}
              key={idx}
            ></button>
          ))}
        </div>
      )}
      <div className="carousel-inner">
        {campground.images.length ? (
          campground.images.map((image, idx) => {
            return (
              <div
                className={`carousel-item ${idx === 0 ? " active" : ""}`}
                style={{ height: "50% !important" }}
                key={idx}
              >
                <img
                  style={{ height: "300px" }}
                  src={image.url}
                  className="d-block w-100"
                  alt={image.filename}
                />
              </div>
            );
          })
        ) : (
          <div
            className={`carousel-item active`}
            style={{ height: "50% !important" }}
          >
            <img
              style={{ height: "300px" }}
              src={null}
              className="d-block w-100"
              alt={"No images"}
            />
          </div>
        )}
      </div>
      {campground.images.length > 1 && (
        <>
          <button
            className=" carousel-control-prev"
            type="button"
            data-bs-target="#campgroundCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#campgroundCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default CampgroundCarousel;
