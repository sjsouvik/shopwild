const cart = require("../models/cart");
const Wishlist = require("../models/wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id })
      .populate("user")
      .populate("product");
    res.json({ wishlist });
  } catch (error) {
    res.status(404).json({
      message: "Unable to get the cart for the user",
      errorMessage: error.message,
    });
  }
};

exports.addItemToWishlist = async (req, res) => {
  try {
    let newItem = new Wishlist(req.body);
    newItem.user = req.user._id;
    const savedItem = await newItem.save();
    res.json({ savedItem });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.deleteItemFromWishlist = async (req, res) => {
  try {
    await Wishlist.deleteOne({ user: req.user._id, product: req.body.product });

    res.json({ message: "Successfully deleted the item from wishlist" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
