// Main Backend server app
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database/db");
const CampgroundRoutes = require("./routes/CampgroundRoutes");
const ReviewRoutes = require("./routes/ReviewRoutes");
const authRoutes = require("./routes/authRoutes");
const { ExpressError } = require("./utils/ExpressError");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/campgrounds", CampgroundRoutes);
app.use("/api/campgrounds/:id/reviews", ReviewRoutes);

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page not found!", 404));
// });

// app.use((err, req, res, next) => {
//   const { message = "Something went wrong!", statusCode = 500 } = err;
//   if (!err.message) err.message = "Oh no something went wrong!";
//   res.status(statusCode).json({ message: err });
// });

app.listen(port, () =>
  console.log(`>> Server loaded successfully on port ${port}`)
);
connectDB();
