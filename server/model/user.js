const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("user", empSchema);