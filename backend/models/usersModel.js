const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UsersModel = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UsersModel);
