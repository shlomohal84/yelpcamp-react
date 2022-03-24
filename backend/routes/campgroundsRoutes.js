const express = require("express");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
} = require("../controllers/campgroundsController");

router.route("/").get(index);

router.route("/new").post(createCampground);

router.route("/:id").get(campgroundContent);

module.exports = router;
