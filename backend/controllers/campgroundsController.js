const CampgroundsModel = require("../models/campgroundsModel");

module.exports.index = async (req, res, next) => {
  const campgrounds = await CampgroundsModel.find()
    .sort({ _id: -1 })
    .populate("reviews");
  res.json(campgrounds);
};

module.exports.campgroundContent = async (req, res, next) => {
  const campground = await CampgroundsModel.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.json(campground);
};

module.exports.createCampground = async (req, res, next) => {
  const campground = new CampgroundsModel(req.body.campground);
  // campground.author = req.user._id;
  console.log(req.body.campground);
  await campground.save();
  res.json(campground);
};
