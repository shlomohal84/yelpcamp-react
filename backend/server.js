const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");
const secret = process.env.SECRET || "thisshouldbeabettersecret";
const campgroundsRoutes = require("./routes/campgroundsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.listen(port, () =>
  console.log(`>> Server loaded successfully on port ${port}`)
);
connectDB();
