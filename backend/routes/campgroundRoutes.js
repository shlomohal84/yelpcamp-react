const express = require("express");
const { authenticateJWT } = require("../middleware/authenticator");
const router = express.Router();
const {
  index,
  createCampground,
  campgroundContent,
  editCampground,
  deleteCampground,
} = require("../controllers/campgroundController");
const checkDbStatus = require("../middleware/checkDbStatus");
const { validateCampground } = require("../middleware/validationSchemas");
//

router.route("/").get(index);

router
  .route("/new")
  .post(authenticateJWT, validateCampground, createCampground);
router
  .route("/:id")
  .get(campgroundContent)
  .delete(authenticateJWT, deleteCampground)
  .put(authenticateJWT, editCampground);

module.exports = router;
