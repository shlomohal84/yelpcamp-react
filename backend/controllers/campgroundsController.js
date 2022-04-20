const CampgroundsModel = require("../models/campgroundsModel");
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const geo = require("mapbox-geocoding");
geo.setAccessToken(mapBoxToken);

/* ==> Show all campgrounds */
module.exports.index = async (req, res) => {
  const campgrounds = await CampgroundsModel.find()
    .sort({ _id: -1 })
    .populate("reviews")
    .limit(20);
  res.json(campgrounds);
};
/* <== Show all campgrounds */

/* ==> Show a single campground content */
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
/* <== Show a single campground content */

/* ==> Create a new campground */
module.exports.createCampground = async (req, res) => {
  geoDataCoords = geo.geocode(
    "mapbox.places",
    req.body.campground.location,
    async (err, data) => {
      if (err || !data.features[0]) {
        console.error(err);
        return res.json(err);
      }
      if (data) {
        const campground = await new CampgroundsModel(req.body.campground);
        campground.geometry = data.features[0].geometry;
        await campground.save();
        res.json(campground);
      }
    }
  );
};
/* <== Create a new campground */

/* ==> Edit a campground */
module.exports.editCampground = async (req, res) => {
  geoDataCoords = geo.geocode(
    "mapbox.places",
    req.body.campground.location,
    async (err, data) => {
      if (err || !data.features[0]) {
        console.error(err);
        return res.json(err);
      }
      if (data) {
        const campground = await CampgroundsModel.findByIdAndUpdate(
          req.params.id,
          { ...req.body.campground },
          { new: true }
        );
        campground.geometry = data.features[0].geometry;
        await campground.save();
        res.json(campground);
      }
    }
  );
};
/* <== Edit a campground */

/* ==> Delete a campground */
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campgrounds = await CampgroundsModel.findByIdAndDelete(id);
  res.json(id);
};
/* <== Delete a campground */
