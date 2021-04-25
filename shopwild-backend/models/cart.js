const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchemaInCart = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
    required: [true, "Please add the product id to cart"],
    unique: [true, "Please add unique product id to cart"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add the quantity of the product"],
  },
});

const cartSchema = mongoose.Schema(
  {
    products: [productSchemaInCart],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
