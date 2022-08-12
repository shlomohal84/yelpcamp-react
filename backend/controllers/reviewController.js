const CampgroundModel = require("../models/campgroundModel");
const ReviewModel = require("../models/ReviewModel");

module.exports.getReviews = async (req, res) => {
  try {
    const campground = await CampgroundModel.findById(req.params.id).populate({
      path: "reviews",
      select: ["_id", "body", "rating", "author"],
      populate: {
        path: "author",
        select: ["username"],
      },
    });
    res.status(200).json({ reviews: campground.reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json({ successMessage: "Server error" });
  }
};

/* ==> Add a review */
module.exports.addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const campground = await CampgroundModel.findById(req.params.id);
    const review = await new ReviewModel(req.body);
    review.author = userId;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    // review.body = req.body.input;
    res.status(200).json({ successMessage: "Added review successfully" });
  } catch (err) {
    res.status(500).json({ errorMessage: "Server error" });
  }
};
/* <== Add a review */

/* ==> Delete a review */
module.exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;
    const review = await ReviewModel.findById(reviewId);
    console.log(review);
    if (!(userId === (review.author && review.author._id.toString()))) {
      return res
        .status(400)
        .json({ errorMessage: "Unauthorized. User is not review's author" });
    }
    await CampgroundModel.findByIdAndUpdate(reviewId, {
      $pull: {
        reviews: reviewId,
      },
    });
    await ReviewModel.findByIdAndDelete(reviewId);
    res.status(200).json({ successMessage: "Review deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
/* <== Delete a review */
