const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const CampgroundsModel = require("../models/campgroundsModel");
const ReviewsModel = require("../models/reviewsModel");
const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const fakeSecret =
  "0acb42734b9e069f1a5401d8c26b582b9e4b89476ad10c74ae2ba967d2fbf5091b4f4702d04f20a4b6f0dfdc605bc57c3ce543b6d786b65a9f28dcc03c9a35b6";

mongoose.connect(
  "mongodb://127.0.0.1:27017/yelpCamp",
  () => console.log("DB CONNECTED"),
  error => console.log(error)
);
async function run() {
  bcrypt.hash("1234", 10, async function (err, hash) {
    const update = await UsersModel.updateOne(
      { _id: "623dfccc3e257184e8e97b10" },
      {
        $set: { "hash": hash },
      }
    );
    console.log(update);
  });
}

run();
