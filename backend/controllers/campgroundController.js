const CampgroundModel = require("../models/campgroundModel");

module.exports.index = async (req, res, next) => {
  const campgrounds = await CampgroundModel.find().sort({ _id: -1 });
  res.json(campgrounds);
};
