const mongoose = require("mongoose");
// const campgroundsModel = require("../models/campgroundsModel");
const localDB = process.env.LOCAL_DB_URI;
const remoteDB = process.env.REMOTE_DB_URI;
const dbName = "yelpCamp";

async function connectDB() {
  try {
    const connect = await mongoose.connect(/* remoteDB || */ localDB);
    console.log(
      `>> MONGODB connected successfully on ${connect.connection.host}/${dbName}`
        .cyan.underline
    );
  } catch (error) {
    throw new Error(error);
  }
  // const campgrounds = await campgroundsModel.find();
  // console.log(campgrounds);
}

module.exports = connectDB;

// const kittySchema = new Schema({
//   name: String,
// });
// kittySchema.methods.speak = function speak() {
//   const greeting = this.name
//     ? `Meow name is ${this.name}!`
//     : "I don't have a name";
//   console.log(greeting);
// };
// const Kitten = model("Kitten", kittySchema);
// const fluffy = new Kitten({ name: "Fluffy" });

// // const silence = new Kitten({ name: "Silence" });
// // await fluffy.save()
// const kittens = await Kitten.find({ name: "Fluffy" });
// console.log(kittens);
// // fluffy.speak();
