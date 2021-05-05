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
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("user")
      .populate("products.product");
    res.json({ cart });
  } catch (error) {
    res.status(404).json({
      message: "Unable to get the cart for the user",
      errorMessage: error.message,
    });
  }
};

exports.createUpdateCart = async (req, res) => {
  try {
    const cartUpdates = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    cartUpdates.user = req.user;

    if (cart === null) {
      cart = new Cart(cartUpdates);
      cart = await cart.save();
      return res.json({ message: "Created cart for the user", cart });
    } else {
      let cartItem = cart.products.find(
        (item) => item.product == cartUpdates.products[0].product
      );
      // cartItem = Cart.findOne({
      //   "products.product": {
      //     $eleMatch: { product: cartUpdates.products[0].product },
      //   },
      // });

      if (cartItem) {
        await Cart.updateOne(
          {
            "products.product": cartUpdates.products[0].product,
          },
          {
            $set: { "products.$.quantity": cartUpdates.products[0].quantity },
          }
        );
      } else {
        await Cart.updateOne(
          { user: cartUpdates.user },
          { $push: { products: cartUpdates.products[0] } }
        );
      }
    }

    res.json({ message: "Successfully updated the cart" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    await Cart.updateOne({ user: req.user }, { $pull: { products: req.body } });
    res.json({ message: "Successfully deleted the item from cart" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
