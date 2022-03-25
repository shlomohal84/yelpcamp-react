const UsersModel = require("../models/usersModel");

module.exports.getUsers = async (req, res, next) => {
  const user = await UsersModel.findById(req.body._id);
  console.log(req.body._id);
  res.json(user);
};

module.exports.login = async (req, res, next) => {
  const user = await UsersModel.findOne();
  // console.log(req.body);
  // console.log(user);
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    console.log("Login Success!");
    return res.status(200).json(user);
  }
  console.log("Login Failed");
  return res.status(500).json("Login Failed");
};
