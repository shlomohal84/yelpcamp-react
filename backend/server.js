// Main Backend server app
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
require("colors");
const connectDB = require("./config/db");
const campgroundsRoutes = require("./routes/campgroundsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const { cloudinary } = require("./utils/cloudinaryAPI");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.listen(port, () =>
  console.log(`>> Server loaded successfully on port ${port}`)
);
connectDB();
