// For testing purposes. not imported in the project

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
  // const camp = await CampgroundsModel.findById("625a13b975dd40ab836d7fce");
  // const reviews = await ReviewsModel.findByIdAndDelete(
  //   "625edee4a12db400a62f6e61"
  // );
  // console.log(await ReviewsModel.find());

  // console.log(reviews);
  // await camp.save();
  // camp.reviews = camp.reviews.filter((c, idx) => idx === 0);
  // await camp.save();
  mongoose.connection.close();
}

run();
