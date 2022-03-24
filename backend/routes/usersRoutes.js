const express = require("express");
const router = express.Router();
const { login, getUsers } = require("../controllers/usersController");

router.route("/login").get(getUsers).post(login);

module.exports = router;
