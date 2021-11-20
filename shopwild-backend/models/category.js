const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name of the category"],
      unique: [true, "Custom unique field"],
    },
    description: {
      type: String,
      required: [true, "Please enter description of the category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
