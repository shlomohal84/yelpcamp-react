const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CampgroundSchema = new Schema({ title: String });

module.exports = model("Campground", CampgroundSchema);
