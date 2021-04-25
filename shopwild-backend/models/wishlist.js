const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchemaInWishlist = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
    required: [true, "Please add the product id to wishlist"],
    unique: [true, "Please add unique product id to wishlist"],
  },
  isWishlisted: {
    type: Boolean,
    required: [true, "Please tell whether the product is wishlisted or not"],
  },
});

const wishlistSchema = mongoose.Schema(
  {
    products: [productSchemaInWishlist],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
