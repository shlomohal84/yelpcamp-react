// Campground Reviews container
// on the right column of campground content

import { useCallback } from "react";
import { useEffect, useState } from "react";
import { addReview, getReviews, deleteReview } from "../api/reviews";
import { isAuthenticated } from "../helpers/auth";
import LoadingSpinner from "./LoadingSpinner";
import { ShowErrorMessage, ShowSuccessMessage } from "./Alerts";
function Reviews({ id }) {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    reviews: [],
    loading: false,
    rating: 1,
    input: "",
    errorMessage: null,
    successMessage: null,
  });
  const {
    reviews,
    rating,
    input,
    loading,
    user,
    errorMessage,
    successMessage,
  } = state;

  const fetchReviews = useCallback(() => {
    const data = { id };
    getReviews(data)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          reviews: response.data.reviews,
        }));
      })
      .catch(err => console.log(err.response.data.errorMessage));
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleRating = evt => {
    setState(prevState => ({ ...prevState, rating: Number(evt.target.value) }));
  };

  const handleInput = evt => {
    setState(prevState => ({ ...prevState, input: evt.target.value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    const data = { id, rating, body: input };
    addReview(data)
      .then(response =>
        setState(prevState => ({
          ...prevState,
          loading: false,
          successMessage: response.data.successMessage,
          input: "",
          rating: 1,
        }))
      )
      .catch(err => {
        console.log(err.response.data.errorMessage);
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: err.response.data.errorMessage,
        }));
      });
    fetchReviews();
  };

  const handleDeleteReview = reviewId => {
    // setState(prevState => ({ ...prevState, loading: true }));
    const data = { id, reviewId };
    deleteReview(data)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          successMessage: response.data.successMessage,
        }));
        fetchReviews();
      })
      .catch(err => {
        console.log(err);
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: err.reponse.data.errorMessage,
        }));
      });
  };

  const renderReviews = () =>
    reviews.map((review, idx) => {
      return (
        <div className="card mb-3" key={idx}>
          <div className="card-body">
            <h5 className="card-title">Author: {review.author.username}</h5>
            <p className="starability-result" data-rating={review.rating}>
              Rated: ${review.rating} stars
            </p>
            <h6 className="card-subtitle mb-2 text-muted"> </h6>
            <p className="card-text fst-italic"> {review.body} </p>

            {isAuthenticated() &&
              user._id === (review.author && review.author._id) && (
                <form
                  onSubmit={evt => {
                    evt.preventDefault();
                    handleDeleteReview(review._id);
                  }}
                >
                  <button className="btn btn-sm btn-danger">Delete</button>
                </form>
              )}
          </div>
        </div>
      );
    });

  const renderAddReviewForm = () =>
    isAuthenticated() && (
      <div className="container mt-5 mb-3">
        <h3 className="mt-0 mb-1 text-center">Leave a review</h3>
        <form
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
    );

  return (
    <>
      {loading && <LoadingSpinner />}
      {errorMessage && <ShowErrorMessage msg={errorMessage} />}
      {successMessage && <ShowSuccessMessage msg={successMessage} />}
      {renderReviews()}
      {renderAddReviewForm()}
    </>
  );
}

export default Reviews;
