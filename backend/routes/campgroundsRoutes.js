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
const checkDbStatus = require("../middleware/checkDbStatus");
router.route("/").get(index);

router.route("/new").post(checkDbStatus, catchAsync(createCampground));

router
  .route("/:id")
  .get(catchAsync(campgroundContent))
  .put(checkDbStatus, catchAsync(editCampground))
  .delete(catchAsync(deleteCampground));

module.exports = router;
