const express = require("express");
const router = express.Router();
const {
  login,
  register,
  isUserAuth,
} = require("../controllers/usersController");
const catchAsync = require("../middleware/catchAsync");
const { verifyJWT } = require("../middleware/userAuth");

router.route("/register").post(catchAsync(register));
router.route("/isUserAuth").get(verifyJWT, isUserAuth);
router.route("/login").post(login);

module.exports = router;
