const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter the first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter the last name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter user's email id"],
      unique: [
        true,
        "This email is already registered, please enter a unique email id",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password to register"],
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
