const mongoose = require("mongoose");
// const campgroundsModel = require("../models/campgroundsModel");
const localDB = process.env.LOCAL_DB_URI;
const remoteDB = process.env.REMOTE_DB_URI;
const dbName = "yelpCamp";

async function connectDB() {
  try {
    const connect = await mongoose.connect(/* remoteDB  ||  */ localDB);
    console.log(
      `>> MONGODB connected successfully on ${connect.connection.host}/${dbName}`
        .cyan.underline
    );
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = connectDB;
