const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../middleware/catchAsync");

const { addReview, deleteReview } = require("../controllers/reviewsController");

router.route("/").post(catchAsync(addReview));

router.route("/:reviewId").delete(catchAsync(deleteReview));

module.exports = router;
