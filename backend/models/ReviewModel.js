const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ReviewsSchema = new Schema(
  {
    body: String,
    rating: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", ReviewsSchema);
