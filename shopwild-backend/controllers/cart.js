const Cart = require("../models/cart");

exports.getAllCarts = async (req, res) => {
  try {
    const allCarts = await Cart.find()
      .populate("user")
      .populate("products.product");
    res.json({ allCarts });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get carts",
      errorMessage: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id })
      .populate("user")
      .populate("product");
    res.json({ cart });
  } catch (error) {
    res.status(404).json({
      message: "Unable to get the cart for the user",
      errorMessage: error.message,
    });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    let newItem = new Cart(req.body);
    newItem.user = req.user._id;
    const savedItem = await newItem.save();
    res.json({ savedItem });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    await Cart.updateOne(
      { user: req.user._id, product: req.body.product },
      { $set: { quantity: req.body.quantity } }
    );

    res.json({ message: "Successfully updated the cart" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    await Cart.deleteOne({ user: req.user._id, product: req.body.product });

    res.json({ message: "Successfully deleted the item from cart" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
