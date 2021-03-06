const CampgroundModel = require("../models/campgroundModel");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geo = require("mapbox-geocoding");
const mongoose = require("mongoose");
geo.setAccessToken(mapBoxToken);
const { cloudinary } = require("../utils/cloudinaryAPI");
const UserModel = require("../models/UserModel");

/* ==> Show all campgrounds */
module.exports.index = async (req, res) => {
  try {
    const campgrounds = await CampgroundModel.find().sort({ _id: -1 });
    // .populate("reviews");
    // .limit(20);
    res.status(200).json({
      campgrounds,
      successMessage: `Found ${campgrounds.length} campgrounds`,
    });
  } catch (err) {
    console.log("Campgrounds index error:\n", err);
    res.status(400).json({
      errorMessage: "Server Error",
    });
  }
};
/* <== Show all campgrounds */

/* ==> Show a single campground content */
module.exports.campgroundContent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.json({ errorMessage: "Invalid id" });
    const campground = await CampgroundModel.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })

      .populate("author", { _id: 1, username: 1 });
    res.status(200).json({ campground });
  } catch (err) {
    console.log("campgroundContent error:\n", err);
    res.status(400).json({ errorMessage: "Server error" });
  }
};
/* <== Show a single campground content */

/* ==> Create a new campground */
module.exports.createCampground = async (req, res) => {
  try {
    console.log("yay");
    res.status(200).json({ successMessage: "yay" });
  } catch (err) {
    console.log("dukes!");
    res.status(400).json({
      errorMessage: "dukes!",
    });
  }
};
// geoDataCoords = geo.geocode(
//   "mapbox.places",
//   req.body.campground.location,
//   async (err, data) => {
//     if (err || !data.features[0]) {
//       console.log("Error connecting to mapbox:\n", err);
//       return res
//         .status(400)
//         .json({ errorMessage: "Error connecting to mapbox:\n", err });
//     }
//     if (data) {
//       const name = req.body.campground.username;
//       const campground = new CampgroundModel(req.body.campground);
//       const user = await UserModel.findOne({ username: name });
//       campground.author = user._id;
//       campground.geometry = data.features[0].geometry;
//       const fileStr = req.body.campground.previewSource;
//       if (fileStr) {
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//           folder: `yelpCamp/${campground._id}`,
//           use_filename: true,
//           unique_filename: false,
//         });
//         campground.images.push({
//           url: uploadedResponse.url,
//           filename: uploadedResponse.folder,
//         });
//       }
//       await campground.save();
//       res.status(200).json({
//         campground: campground,
//         successMessage: "New campground created successfully!",
//       });
//     }
//   }
// );

// };
// /* <== Create a new campground */

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
        const campground = await CampgroundModel.findByIdAndUpdate(
          req.params.id,
          { ...req.body.campground },
          { new: true }
        );

        campground.geometry = data.features[0].geometry;
        const fileStr = req.body.campground.previewSource;
        if (fileStr) {
          const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: `yelpCamp/${campground._id}`,
            use_filename: true,
            unique_filename: false,
          });
          campground.images.push({
            url: uploadedResponse.url,
            filename: uploadedResponse.folder,
          });
        }
        await campground.save();
        res.status(200).json(campground);
      }
    }
  );
};
/* <== Edit a campground */

/* ==> Delete a campground */
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campgrounds = await CampgroundModel.findByIdAndDelete(id);
  res.status(200).json({ id });
};
/* <== Delete a campground */
