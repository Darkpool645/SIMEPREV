const crypto = require("crypto");
require("dotenv").config();

const SALT = process.env.SALT;

const generateHashedPassword = (password) => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, "sha512")
    .toString("hex");
  return hashedPassword;
};

const verifyPassword = (password, hash) => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, "sha512")
    .toString("hex");
  return hashedPassword === hash;
};

module.exports = {
  generateHashedPassword,
  verifyPassword,
};
