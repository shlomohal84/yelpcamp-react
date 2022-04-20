const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

/* ==> Create a new user */
module.exports.register = async (req, res) => {
  const newUser = new UsersModel({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  // save user to db
  await newUser.save(function (err) {
    if (err) throw err;
    console.log("Registered Successfuly!");
  });

  res.json({ message: "Registered Successfuly!", registerStatus: true });
};
/* <== Create a new user */

/* ==> Login User */
module.exports.login = async (req, res) => {
  //fetch user and test password verification
  UsersModel.findOne({ username: req.body.username }, function (err, user) {
    if (err) throw err;
    //test matching password
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) throw err;
      if (!isMatch) {
        return res.json({
          loginStatus: isMatch,
          message: "Incorrect username or password",
        });
      }
      return res.json({
        username: user.username,
        id: user._id,
        loginStatus: isMatch,
        message: "Logged in successfully!",
      });
    });
  });
};
/* <== Login User */
