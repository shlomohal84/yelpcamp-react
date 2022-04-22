// Campground Reviews container
// on the right column of campground content

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function Reviews({ campground, username, isLoggedIn, getApi }) {
  const author = campground.author.username;

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [state, setState] = useState({
    rating: 1,
    input: "",
    reviewId: "",
  });
  const { rating, input, reviewId } = state;

  const handleRating = evt => {
    setState(prevState => ({ ...prevState, rating: Number(evt.target.value) }));
  };

  const handleInput = evt => {
    setState(prevState => ({ ...prevState, input: evt.target.value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    await axios.post(`/campgrounds/${id}/reviews`, {
      author: username,
      review: { rating, body: input },
    });
    setState(prevState => ({
      ...prevState,
      input: "",
      rating: 1,
    }));
    getApi();
  };

  const handleDelete = async evt => {
    evt.preventDefault();
    await axios.delete(`/campgrounds/${id}/reviews/${reviewId}`);
    getApi();
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <>
      {username && (
        <>
          <h2>Leave a review</h2>
          <form
            action={`/campgrounds/${id}/reviews`}
            onSubmit={handleSubmit}
            method="POST"
            className="mb-3 validated-form"
            noValidate
            required
          >
            <div className="mb-3">
              <fieldset className="starability-basic">
                <input
                  type="radio"
                  id="no-rate"
                  className="input-no-rate"
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

            <div className="mb-3">
              <label className="form-label" htmlFor="body">
                Review text:
              </label>
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
            <button className="btn btn-success">Submit</button>
          </form>
        </>
      )}

      {campground.reviews.map((review, idx) => {
        return (
          <div className="card mb-3" key={idx}>
            <div className="card-body">
              <h5 className="card-title">Author: {review.author.username}</h5>
              <p className="starability-result" data-rating={review.rating}>
                Rated: 3 stars
              </p>
              <h6 className="card-subtitle mb-2 text-muted"> </h6>
              <p className="card-text fst-italic"> {review.body} </p>
              {username === author && (
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
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Reviews;
