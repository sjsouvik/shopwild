const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: [true, "Please add the product id to add to cart"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add the quantity of the product"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
