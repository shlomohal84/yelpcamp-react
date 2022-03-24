const UsersModel = require("../models/usersModel");

module.exports.getUsers = async (req, res, next) => {
  const users = await UsersModel.find();
  res.json(users);
};

module.exports.login = async (req, res, next) => {
  const user = await UsersModel(req.body);
  console.log(req.body);
  res.json(user);
};
