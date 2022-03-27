const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

// module.exports.getUsers = async (req, res) => {
//   const user = await UsersModel.findById(req.body._id);
//   console.log(req.body._id);
//   res.json(user);
// };

module.exports.register = async (req, res) => {
  //create a new user
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
  res.send(`${req.body.username} registered Successfuly!`);
};

module.exports.login = async (req, res) => {
  //fetch user and test password verification
  UsersModel.findOne({ username: req.body.username }, function (err, user) {
    if (err) throw err;
    //test matching password
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) throw err;
      if (!isMatch) {
        console.log("Incorrect username or password");
        return res.send("Incorrect username or password");
      }
      console.log("Logged in successfully!");
      return res.send("Logged in successfully!");
    });
  });
};
