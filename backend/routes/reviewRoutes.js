const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticateJWT } = require("../middleware/authenticator");
const {
  addReview,
  deleteReview,
  getReviews,
} = require("../controllers/reviewController");

router.route("/").get(getReviews).post(authenticateJWT, addReview);

router.route("/:id").delete(authenticateJWT, deleteReview);

module.exports = router;
