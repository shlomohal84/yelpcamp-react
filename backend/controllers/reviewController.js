const ReviewModel = require("../models/ReviewModel");
const CampgroundModel = require("../models/campgroundModel");
const UserModel = require("../models/UserModel");

/* ==> Add a review */
module.exports.addReview = async (req, res) => {
  const author = req.body.author;
  const campground = await CampgroundModel.findById(req.params.id);
  const review = new ReviewModel(req.body.review);
  const user = await UserModel.findOne({ username: author });
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
  await CampgroundModel.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await ReviewModel.findByIdAndDelete(reviewId);
  res.json(await campgroundModel.findById(id));
};
/* <== Delete a review */
