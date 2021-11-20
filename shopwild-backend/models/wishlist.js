const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: [true, "Please add the product id to wishlist"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
