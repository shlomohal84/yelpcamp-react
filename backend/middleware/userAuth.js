// User authorization and tokens
const jwt = require("jsonwebtoken");

module.exports.verifyJWT = function (req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return req.json({
          isLoggedIn: false,
          message: "Failed to authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect token given", isLoggedIn: false });
  }
};
