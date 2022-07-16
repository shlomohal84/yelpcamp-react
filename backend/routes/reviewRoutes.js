const express = require("express");
const router = express.Router({ mergeParams: true });

const { addReview, deleteReview } = require("../controllers/ReviewController");

router.route("/").post(addReview);

router.route("/:reviewId").delete(deleteReview);

module.exports = router;
