const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const UsersModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UsersModel);

// /* ==> Hash password on new user registration */
// UsersModel.pre("save", function (next) {
//   const user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   //generate salt+hash
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) return next(err);

//     // Override the clearText password with hahsed one
//     user.password = hash;
//     next();
//   });
// });
// /* <== Hash password on new user registration */

// /* ==> Validate password on user login */
// UsersModel.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };
// /* <== Validate password on user login */
