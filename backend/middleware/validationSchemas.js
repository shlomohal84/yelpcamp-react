const { campgroundSchema, reviewSchema } = require("../middleware/joiSchemas");
const Campground = require("../models/CampgroundModel");
const Review = require("../models/ReviewModel");

module.exports.validateCampground = (res, req, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(elm => elm.message).join(",");
    return res.status(400).json({ errorMessage: msg });
  }
  next();
};
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(elm => elm.message).join(",");
    return res.status(400).json({ errorMessage: msg });
  }
  next();
};
