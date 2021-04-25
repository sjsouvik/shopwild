const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter user's full name"],
  },
  email: {
    type: String,
    required: [true, "Please enter user's email id"],
  },
});

module.exports = mongoose.model("User", userSchema);
