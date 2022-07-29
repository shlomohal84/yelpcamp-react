const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
} = require("../controllers/authController");
const { authenticateJWT } = require("../middleware/authenticator");
const {
  registerValidator,
  loginValidator,
  validatorResult,
} = require("../middleware/validator");

router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerController
);
router.post("/login", loginValidator, validatorResult, loginController);

module.exports = router;
