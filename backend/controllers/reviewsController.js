const ReviewsModel = require("../models/reviewsModel");

module.exports.reviews = async (req, res, next) => {
  const reviews = await ReviewsModel.find().populate("author");
  console.log(reviews);
  res.json(reviews);
};
