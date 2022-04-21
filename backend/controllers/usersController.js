const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsersModel = require("../models/usersModel");
const jwtSecret = process.env.JWT_SECRET;
/* ==> Create a new user */

module.exports.register = async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const takenUsername = await UsersModel.findOne({ username: user.username });
  const takenEmail = await UsersModel.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    console.log("Username or email has already been taken");
    return res.json({ message: "Username or email has already been taken" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const dbUser = new UsersModel({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });
    dbUser.save();
    console.log("Registered Successfuly!");
    res.json({ message: "Registered Successfuly!" });
  }
};

module.exports.isUserAuth = (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
};

// /* ==> Login User */
module.exports.login = (req, res) => {
  const userLoggingIn = req.body;
  UsersModel.findOne({ username: userLoggingIn.username }).then(dbUser => {
    if (!dbUser) {
      return res.json({
        message: "Incorrect username or password",
      });
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(payload, jwtSecret, { expiresIn: 86400 }, (err, token) => {
          if (err) return res.json({ message: err });
          return res.json({ message: "Success!", token: "Bearer " + token });
        });
      } else {
        return res.json({
          message: "Incorrect username or password",
        });
      }
    });
  });
};
// /* <== Login User */

/* <== Create a new user */
// const UsersModel = require("../models/usersModel");
// const bcrypt = require("bcrypt");

// /* ==> Create a new user */
// module.exports.register = async (req, res) => {
//   const newUser = new UsersModel({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   });

//   // save user to db
//   await newUser.save(function (err) {
//     if (err) throw err;
//     console.log("Registered Successfuly!");
//   });

//   res.json({ message: "Registered Successfuly!", registerStatus: true });
// };
// /* <== Create a new user */

// /* ==> Login User */
// module.exports.login = async (req, res) => {
//   //fetch user and test password verification
//   UsersModel.findOne({ username: req.body.username }, function (err, user) {
//     if (err) throw err;
//     //test matching password
//     user.comparePassword(req.body.password, function (err, isMatch) {
//       if (err) throw err;
//       if (!isMatch) {
//         return res.json({
//           loginStatus: isMatch,
//           message: "Incorrect username or password",
//         });
//       }
//       return res.json({
//         username: user.username,
//         id: user._id,
//         loginStatus: isMatch,
//         message: "Logged in successfully!",
//       });
//     });
//   });
// };
// /* <== Login User */
