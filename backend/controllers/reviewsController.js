const ReviewsModel = require("../models/reviewsModel");
const CampgroundsModel = require("../models/campgroundsModel");
const campgroundsModel = require("../models/campgroundsModel");
const usersModel = require("../models/usersModel");

/* ==> Add a review */
module.exports.addReview = async (req, res) => {
  const author = req.body.author;
  const campground = await CampgroundsModel.findById(req.params.id);
  const review = new ReviewsModel(req.body.review);
  const user = await usersModel.findOne({ username: author });
  const userId = user._id;
  review.author = userId;
  campground.reviews.push(review);
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
