const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const CampgroundsModel = require("../models/campgroundsModel");
const ReviewsModel = require("../models/reviewsModel");
const UsersModel = require("../models/usersModel");

mongoose.connect(
  "mongodb://127.0.0.1:27017/yelpCamp",
  () => console.log("DB CONNECTED"),
  error => console.log(error)
);
async function run() {}
run();
