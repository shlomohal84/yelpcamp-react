const express = require("express");
const router = express.Router();
const campgroundController = require("../controllers/campgroundController");

router.route("/").get(campgroundController.index);

module.exports = router;
