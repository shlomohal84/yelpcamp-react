const CampgroundModel = require("../models/campgroundModel");
const UserModel = require("../models/UserModel");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geo = require("mapbox-geocoding");
const mongoose = require("mongoose");
geo.setAccessToken(mapBoxToken);
const { cloudinary } = require("../utils/cloudinaryAPI");
const { json } = require("express");

/* ==> Show all campgrounds */
module.exports.index = async (req, res) => {
  try {
    const campgrounds = await CampgroundModel.find()
      .sort({ _id: -1 })
      .select(["title", "images", "geometry", "location", "description"]);

    res.status(200).json({
      campgrounds,
      successMessage: `Found ${campgrounds.length} campgrounds`,
    });
  } catch (err) {
    console.log("Campgrounds index error:\n", err);
    res.status(500).json({
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
        populate: { path: "author", select: { _id: 1, username: 1 } },
      })
      .populate("author", { _id: 1, username: 1 });

    return res.status(200).json({ campground, user: req.user });
  } catch (err) {
    console.log("campgroundContent error:\n", err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
/* <== Show a single campground content */

/* ==> Create a new campground */
module.exports.createCampground = async (req, res) => {
  try {
    geoDataCoords = geo.geocode(
      "mapbox.places",
      req.body.location,
      async (err, data) => {
        if (err || !data.features[0]) {
          console.log("Error connecting to mapbox:\n", err);
          return res
            .status(400)
            .json({ errorMessage: "Error connecting to mapbox:\n", err });
        }
        if (data) {
          const campground = new CampgroundModel(req.body);
          campground.author = req.user._id;
          campground.geometry = data.features[0].geometry;
          const fileStr = req.body.previewSource;
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
          res.status(200).json({
            campgroundId: campground._id,
            successMessage: "New campground created successfully!",
          });
        }
      }
    );
  } catch (err) {
    console.log("Server error:\n", err);
    res.status(400).json({
      errorMessage: "Server error",
    });
  }
};

// };
// /* <== Create a new campground */

/* ==> Edit a campground */
module.exports.editCampground = async (req, res) => {
  // geoDataCoords = geo.geocode(
  //   "mapbox.places",
  //   req.body.campground.location,
  //   async (err, data) => {
  //     if (err || !data.features[0]) {
  //       console.error(err);
  //       return res.json(err);
  //     }
  //     if (data) {
  //       const campground = await CampgroundModel.findByIdAndUpdate(
  //         req.params.id,
  //         { ...req.body.campground },
  //         { new: true }
  //       );
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
  //       res.status(200).json(campground);
  //     }
  //   }
  // );
};
/* <== Edit a campground */

/* ==> Delete a campground */
module.exports.deleteCampground = async (req, res) => {
  try {
    const userId = req.user._id;
    const campground = await CampgroundModel.findById(req.params.id);
    const authorId = campground.author._id.toString();
    if (!(userId === authorId)) {
      console.log("Access Denied. User is not author");
      return res
        .status(401)
        .json({ errorMessage: "Access Denied. User is not author" });
    }
    console.log("Delete request called");
    res.status(200).json({ successMessage: "Delete request called" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
/* <== Delete a campground */
