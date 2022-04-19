const CampgroundsModel = require("../models/campgroundsModel");
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const geo = require("mapbox-geocoding");
geo.setAccessToken(mapBoxToken);

module.exports.index = async (req, res) => {
  const campgrounds = await CampgroundsModel.find()
    .sort({ _id: -1 })
    .populate("reviews")
    .limit(20);
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

// await campground.save();
