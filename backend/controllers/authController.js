const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret, jwtExpire } = require("../config/keys");
/* ==> Create a new user */

module.exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(400).json({
        errorMessage: "Username already exists",
      });
    }
    const doesEmailExist = await UserModel.findOne({ email: email });
    if (doesEmailExist) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newUser = new UserModel();
    newUser.username = username;
    newUser.email = email;
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(200).json({
      successMessage: "New user registered successfully! Please log in",
    });
  } catch (err) {
    console.log("registerController error", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

// /* ==> Login User */
module.exports.loginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error", err);
      const { _id, username, email } = user;
      return res.json({
        token,
        user: { _id, username, email },
      });
    });
  } catch (err) {
    console.log("loginController error:", err);
    res.status(400).json({ errorMessage: "Server error" });
  }
};
