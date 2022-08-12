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
  // const author = req.body.author;
  // const campground = await CampgroundModel.findById(req.params.id);
  // const review = new ReviewModel(req.body.review);
  // const user = await UserModel.findOne({ username: author });
  // const userId = user._id;
  // review.author = userId;
  // campground.reviews.push(review);
  // await review.save();
  // await campground.save();
  // res.json(review);
};
/* <== Add a review */

/* ==> Delete a review */
module.exports.deleteReview = async (req, res) => {
  // const { id, reviewId } = req.params;
  // await CampgroundModel.findByIdAndUpdate(id, {
  //   $pull: { reviews: reviewId },
  // });
  // await ReviewModel.findByIdAndDelete(reviewId);
  // res.json(await campgroundModel.findById(id));
};
/* <== Delete a review */
