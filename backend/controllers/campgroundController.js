const CampgroundModel = require("../models/campgroundModel");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geo = require("mapbox-geocoding");
const mongoose = require("mongoose");
geo.setAccessToken(mapBoxToken);
const cloudinary = require("../utils/cloudinaryAPI");

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
          const files = req.body.previewSource;

          if (Array.isArray(files)) {
            for (let file of files) {
              const uploadedResponse = await cloudinary.uploader.upload(file, {
                folder: `yelpCamp/${campground._id}`,
                use_filename: true,
                unique_filename: false,
              });
              campground.images.push({
                url: uploadedResponse.url,
                filename: uploadedResponse.folder,
                public_id: uploadedResponse.public_id,
              });
            }
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
  try {
    const userId = req.user._id;
    const campground = await CampgroundModel.findById(req.params.id);
    console.log(userId);

    res.status(200).json({ campground });
  } catch (err) {
    res.status(500).json({ errorMessage: "YEEEEEET" });
  }

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
    if (campground.images.length) {
      const publicIds = campground.images.map(img => img.public_id);
      await cloudinary.api.delete_resources(publicIds);
    }

    await CampgroundModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ successMessage: "Campground deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
/* <== Delete a campground */
