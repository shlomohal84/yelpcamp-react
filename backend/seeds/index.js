// Auto assign random initial campground data

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const REMOTE_DB_URI = process.env.REMOTE_DB_URI;
const LOCAL_DB_URI = process.env.LOCAL_DB_URI;

const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const Campground = require("../models/CampgroundModel");
const Review = require("../models/ReviewModel");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eaque facilis a perferendis laboriosam odio. Itaque pariatur labore eum perspiciatis dolorem quae minima nesciunt velit dolor. Dolor dignissimos eos dolorem!";

const dbUrl = REMOTE_DB_URI || LOCAL_DB_URI;
mongoose.connect(dbUrl);

// mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:\n"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62fa4c3d0f017773ccabd462",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/snackeater/image/upload/v1660571418/yelpCamp/general/photo-1660121999586-460e739dd9fd_uygxer.avif",
          filename:
            "YelpCamp/general/photo-1660121999586-460e739dd9fd_uygxer.avif",
        },
        {
          url: "https://res.cloudinary.com/snackeater/image/upload/v1660571379/yelpCamp/general/photo-1660560672343-b1ed7f24cf8c_jnbasc.avif",
          filename:
            "yelpCamp/general/photo-1660560672343-b1ed7f24cf8c_jnbasc.avif",
        },
      ],
      description: lorem,
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
