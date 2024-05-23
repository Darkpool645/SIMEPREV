const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log("Conection to database successfully");
  } catch (err) {
    console.error("It was an error during connection to the database: ", err);
    process.exit(1);
  }
};

module.exports = connectionDB;
