const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");
const secret = process.env.SECRET || "thisshouldbeabettersecret";

const campgroundRoutes = require("./routes/campgroundRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/campgrounds", campgroundRoutes);

app.listen(port, () =>
  console.log(`>> Server loaded successfully on port ${port}`)
);
connectDB();
