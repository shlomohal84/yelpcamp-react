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

(async function run() {
  // const camp = await CampgroundsModel.find()
  //   .where("_id")
  //   .equals("623c70f067c9e0b3ae57e323")
  //   .populate("reviews");

  const reviews = await ReviewsModel.find();

  // for (let review of reviews) {
  //   review.rating = 3;
  //   // review.save();
  // }
  reviews[1].rating = 1;
  // await reviews[1].save();
  console.log(reviews);
  // camp[0].images[0] = {
  //   url: "https://images.unsplash.com/photo-1599765625239-fe53131a58ee?height=500",
  //   filename: "doggo",
  // };
  // camp[0].images.pop();
  // console.log(camp[0].images);
  // await camp[0].save();
})();
