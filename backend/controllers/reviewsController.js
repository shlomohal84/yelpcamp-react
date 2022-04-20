const ReviewsModel = require("../models/reviewsModel");
const CampgroundsModel = require("../models/campgroundsModel");
const campgroundsModel = require("../models/campgroundsModel");

/* ==> Add a review */
module.exports.addReview = async (req, res) => {
  const campground = await CampgroundsModel.findById(req.params.id);
  const review = new ReviewsModel(req.body.review);
  review.author = req.body.author;
  campground.reviews.push(review);
  console.log(review);
  await review.save();
  await campground.save();
  res.json(review);
};
/* <== Add a review */

/* ==> Delete a review */
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await CampgroundsModel.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await ReviewsModel.findByIdAndDelete(reviewId);
  res.json(await campgroundsModel.findById(id));
};
/* <== Delete a review */
