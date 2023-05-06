// Main Backend server app
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const CampgroundRoutes = require("./routes/campgroundRoutes");
const ReviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const { ExpressError } = require("./utils/ExpressError");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize());
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

connectDB().then(
  app.listen(port, () =>
    console.log(`>> Server loaded successfully on port ${port}`)
  )
);
