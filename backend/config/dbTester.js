const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { update } = require("../models/campgroundsModel");
const CampgroundsModel = require("../models/campgroundsModel");
const ReviewsModel = require("../models/reviewsModel");
mongoose.connect(
  "mongodb://127.0.0.1:27017/yelpCamp",
  () => console.log("DB CONNECTED"),
  error => console.log(error)
);

async function run() {
  const camp = await CampgroundsModel.find()
    .where("_id")
    .equals("623c70f067c9e0b3ae57e323")
    .populate("reviews");
  camp[0].location = "Netanya, Israel";
  // console.log(camp[0]);
  console.log(camp[0]);
  // await camp[0].save();
}
run();
