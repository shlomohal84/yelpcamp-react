function CampgroundCarousel({ campground }) {
  return (
    <div
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
        {campground.images.map((image, idx) => {
          return (
            <div
              className={`carousel-item ${idx === 0 ? " active" : ""}`}
              key={idx}
            >
              <img
                src={image.url}
                className="d-block w-100"
                alt={image.title}
              />
            </div>
          );
        })}
      </div>
      {campground.images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
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
