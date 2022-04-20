const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.log(
      `CANNOT CONNECT TO DB: STATUS ${mongoose.connection.readyState}`
    );
    return res.status(500).json({
      message: `CANNOT CONNECT TO DB: STATUS ${mongoose.connection.readyState}`,
    });
  }
  next();
};
