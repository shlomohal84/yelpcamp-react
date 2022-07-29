// Form validators

const { check, validationResult } = require("express-validator");

module.exports.registerValidator = [
  check("username")
    .not()
    .isEmpty()
    .trim()
    .withMessage("All fields are required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];

module.exports.loginValidator = [
  check("username" || "password")
    .not()
    .isEmpty()
    .trim()
    .withMessage("All fields are required"),
];

module.exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }
  next();
};
