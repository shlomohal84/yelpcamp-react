const express = require("express");
const catchAsync = require("../middleware/catchAsync");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
  editCampground,
  deleteCampground,
} = require("../controllers/campgroundsController");

router.route("/").get(index);

router.route("/new").post(catchAsync(createCampground));

router
  .route("/:id")
  .get(campgroundContent)
  .put(catchAsync(editCampground))
  .delete(catchAsync(deleteCampground));

module.exports = router;
