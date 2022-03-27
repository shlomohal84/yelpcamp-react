const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/usersController");
const catchAsync = require("../middleware/catchAsync");

router.route("/login").post(catchAsync(login));
router.route("/register").post(catchAsync(register));

module.exports = router;
