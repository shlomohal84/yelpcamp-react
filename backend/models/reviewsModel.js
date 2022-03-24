const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ReviewsSchema = new Schema({
  body: String,
  id: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Review", ReviewsSchema);
