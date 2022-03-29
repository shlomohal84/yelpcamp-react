const express = require("express");
const catchAsync = require("../middleware/catchAsync");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
  editCampground,
} = require("../controllers/campgroundsController");

router.route("/").get(index);

router.route("/new").post(catchAsync(createCampground));

router.route("/:id").get(campgroundContent);

router.route("/:id/edit").put(catchAsync(editCampground));

module.exports = router;
