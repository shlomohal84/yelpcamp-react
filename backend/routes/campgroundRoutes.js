const express = require("express");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
  editCampground,
  deleteCampground,
} = require("../controllers/CampgroundController");
const checkDbStatus = require("../middleware/checkDbStatus");
router.route("/").get(index);

router.route("/new").post(checkDbStatus, createCampground);

router
  .route("/:id")
  .get(campgroundContent)
  .put(checkDbStatus, editCampground)
  .delete(deleteCampground);

module.exports = router;
