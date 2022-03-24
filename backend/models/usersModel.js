const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UsersModel = new Schema({
  name: String,
});

module.exports = model("User", UsersModel);
