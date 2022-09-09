const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 20,
    unique: true,
  }
 
});

module.exports = mongoose.model("Users", userSchema);
