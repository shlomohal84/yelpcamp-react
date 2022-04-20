const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ReviewsModel = require("./reviewsModel");

/* ==> Schema for image cloud uploads */
const ImageSchema = new Schema({
  url: String,
  filename: String,
});
/* <== Schema for image cloud uploads */

const CampgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

/* ==> Method deleting all reviews under deleted campground */
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await ReviewsModel.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
/* <== Method deleting all reviews under deleted campground */

module.exports = model("Campground", CampgroundSchema);
