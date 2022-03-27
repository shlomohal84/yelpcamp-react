const CampgroundsModel = require("../models/campgroundsModel");

module.exports.index = async (req, res) => {
  const campgrounds = await CampgroundsModel.find()
    .sort({ _id: -1 })
    .populate("reviews")
    .limit(10);
  res.json(campgrounds);
};

module.exports.campgroundContent = async (req, res) => {
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

module.exports.createCampground = async (req, res) => {
  const campground = new CampgroundsModel(req.body.campground);
  // campground.author = req.user._id;
  console.log(req.body.campground);
  await campground.save();
  res.json(campground);
};
