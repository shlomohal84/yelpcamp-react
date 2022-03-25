const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const reviewsModel = require("./reviewsModel")

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const CampgroundSchema = new Schema(
  {
    title: String,
    location: String,
    description: String,
    price: Number,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    // createdAt: {
    //   type: Date,
    //   immutable: true,
    //   default: () => Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   default: () => Date.now(),
    // },
  },
  { timestamps: true }
);

module.exports = model("Campground", CampgroundSchema);
