// Campground Reviews container
// on the right column of campground content

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function Reviews({ reviews }) {
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [state, setState] = useState({
    rating: 1,
    input: "",
    reviewId: "",
    loading: "",
  });
  const { rating, input, reviewId, loading } = state;

  const handleRating = evt => {
    setState(prevState => ({ ...prevState, rating: Number(evt.target.value) }));
  };

  const handleInput = evt => {
    setState(prevState => ({ ...prevState, input: evt.target.value }));
  };

  const handleSubmit = async evt => {
    // evt.preventDefault();
    // await axios.post(`/campgrounds/${id}/reviews`, {
    //   author: username,
    //   review: { rating, body: input },
    // });
    // setState(prevState => ({
    //   ...prevState,
    //   input: "",
    //   rating: 1,
    // }));
    // getApi();
  };

  const handleDelete = async evt => {
    // evt.preventDefault();
    // await axios.delete(`/campgrounds/${id}/reviews/${reviewId}`);
    // getApi();
  };

  if (loading) return <LoadingSpinner />;
  return (
    <>
      {reviews.map((review, idx) => {
        return (
          <div className="card mb-3" key={idx}>
            <div className="card-body">
              <h5 className="card-title">Author: {review.author.username}</h5>
              <p className="starability-result" data-rating={review.rating}>
                Rated: 3 stars
              </p>
              <h6 className="card-subtitle mb-2 text-muted"> </h6>
              <p className="card-text fst-italic"> {review.body} </p>

              <form
                onSubmit={handleDelete}
                method="DELETE"
                action={`/campgrounds/${id}/reviews/${review._id}`}
              >
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setState(prevState => ({
                      ...prevState,
                      reviewId: review._id,
                    }))
                  }
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        );
      })}
      <div className="container mt-5 mb-3">
        <h3 className="mt-0 mb-1 text-center">Leave a review</h3>
        <form
          action={`/campgrounds/${id}/reviews`}
          onSubmit={handleSubmit}
          method="POST"
          className="validated-form"
          noValidate
          required
        >
          <div className="mb-2" style={{ height: "2em" }}>
            <fieldset className="starability-basic mx-auto">
              <input
                type="radio"
                id="no-rate"
                className="input-no-rate "
                name="review[rating]"
                value={1}
                aria-label="No rating."
              />
              <input
                type="radio"
                id="first-rate1"
                name="review[rating]"
                value={1}
                onChange={handleRating}
                checked={rating === 1 && true}
              />
              <label htmlFor="first-rate1" title="Terrible">
                1 star
              </label>
              <input
                type="radio"
                id="first-rate2"
                name="review[rating]"
                value={2}
                onChange={handleRating}
              />
              <label htmlFor="first-rate2" title="Not good">
                2 stars
              </label>
              <input
                type="radio"
                id="first-rate3"
                name="review[rating]"
                value={3}
                onChange={handleRating}
              />
              <label htmlFor="first-rate3" title="Average">
                3 stars
              </label>
              <input
                type="radio"
                id="first-rate4"
                name="review[rating]"
                value={4}
                onChange={handleRating}
              />
              <label htmlFor="first-rate4" title="Very good">
                4 stars
              </label>
              <input
                type="radio"
                id="first-rate5"
                name="review[rating]"
                value={5}
                onChange={handleRating}
              />
              <label htmlFor="first-rate5" title="Amazing">
                5 stars
              </label>
            </fieldset>
          </div>

          <div className="mb-1">
            <textarea
              value={input}
              onChange={handleInput}
              className="form-control"
              name="input"
              id="input"
              cols="30"
              rows="3"
              required
            ></textarea>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="d-flex justify-content-center mt-0">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Reviews;
