const express = require("express");
const { authenticateJWT } = require("../middleware/authenticator");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
  editCampground,
  deleteCampground,
} = require("../controllers/CampgroundController");
const checkDbStatus = require("../middleware/checkDbStatus");
//
router.route("/").get(index);

router.route("/new").post(authenticateJWT, createCampground);

router
  .route("/:id")
  .get(campgroundContent)
  .put(checkDbStatus, editCampground)
  .delete(checkDbStatus, deleteCampground);

module.exports = router;
