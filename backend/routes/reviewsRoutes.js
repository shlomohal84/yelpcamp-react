const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../middleware/catchAsync");

const {
  reviews,
  addReview,
  deleteReview,
} = require("../controllers/reviewsController");

router.route("/").get(reviews).post(catchAsync(addReview));

router.route("/:reviewId").delete(catchAsync(deleteReview));

module.exports = router;
