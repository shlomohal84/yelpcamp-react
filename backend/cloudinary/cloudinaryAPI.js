require("dotenv").config();
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);
