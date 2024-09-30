const connectDB = require("../db/connectDB");
const mongoose = connectDB();
const toDoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("todo", toDoSchema);

module.exports = ToDo;
