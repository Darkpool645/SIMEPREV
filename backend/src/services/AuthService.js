const jwt = require("jsonwebtoken");
const dbConnection = require("../utils/MongoConection");
const User = require("../models/User");
const {
  generateHashedPassword,
  verifyPassword,
} = require("../utils/PasswordEncoder");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function signup(name, lastname, email, password) {
  await dbConnection();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("This email already has an account");
  }
  const hashedPassword = generateHashedPassword(password);
  const newUser = new User({
    name,
    lastname,
    email,
    password: hashedPassword,
    rol: "paciente",
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      rol: newUser.rol,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: await User.findOne({ email }).select("-_id -password"),
  };
}

async function signin(email, password) {
  await dbConnection();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      rol: user.rol,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: await User.findOne({ email }).select("-_id -password"),
  };
}

module.exports = {
  signup,
  signin,
};
