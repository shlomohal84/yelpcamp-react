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
  console.log(req.body);
  await campground.save();
  res.json(campground);
};

module.exports.editCampground = async (req, res) => {
  const { title, location, price, description, images } = req.body;
  const campground = await CampgroundsModel.findByIdAndUpdate(
    req.params.id,
    { title, location, price, description, images },
    { new: true }
  );
  await campground.save();
  console.log(campground);
  // console.log(req.body);
  res.json(campground);
};
