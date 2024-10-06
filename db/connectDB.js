const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
      console.log("Connection to mongoDB is successful!");
    })
    .catch((error) => {
      console.log(error.message);
    });
  return mongoose;
};

module.exports = connectDB;
