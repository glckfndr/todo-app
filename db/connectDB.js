const mongoose = require("mongoose");

const connectionURL = "mongodb://localhost:27017/todoDB";

const connectDB = () => {
  mongoose
    .connect(connectionURL)
    .then(() => {
      console.log("Connection to mongoDB is successful!");
    })
    .catch((error) => {
      console.log(error.message);
    });
  return mongoose;
};

module.exports = connectDB;
