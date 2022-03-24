const express = require("express");
const router = express.Router();
const { reviews } = require("../controllers/reviewsController");

router.route("/").get(reviews);

module.exports = router;
