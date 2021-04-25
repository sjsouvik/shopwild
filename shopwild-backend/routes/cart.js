const express = require("express");
const router = express.Router();

const { extend } = require("lodash");

const Cart = require("../models/cart");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router
  .route("/cart/:userId")
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
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
  });

router.get("/cart", async (req, res) => {
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
});

// router.route("/cart/update/:userId").post(async (req, res) => {
//   try {
//     const cartUpdates = req.body;
//     let cart = await Cart.find({ user: req.user._id })
//       .populate("user")
//       .populate("products.product");
//     cart = extend(cart, cartUpdates);
//     cart = await cart.save();
//     res.json({ cart });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error occured", errorMessage: error.message });
//   }
// });
//   .delete(async (req, res) => {
//     try {
//       const cart = await Cart.find({ user: req.user._id });
//       await cart.remove();
//       res.json({ message: "DELETED Successfully", cart });
//     } catch (error) {
//       res
//         .status(400)
//         .json({ message: "Error occured", errorMessage: error.message });
//     }
//   });

// router.param("cartId", async (req, res, next, id) => {
//   try {
//     const cart = await Cart.findById(id);

//     if (!cart) {
//       return res.status(404).json({ message: "NOT Found the cart" });
//     }

//     req.cart = cart;
//     next();
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error occured", errorMessage: error.message });
//   }
// });

// router
//   .route("/cart/:cartId")
//   .get(async (req, res) => {
//     let { cart } = req;
//     cart.__v = undefined;
//     res.json({ cart });
//   })
//   .post(async (req, res) => {
//     try {
//       let { cart } = req;
//       const cartUpdates = req.body;
//       cart = extend(cart, cartUpdates);
//       cart = await cart.save();
//       res.json({ cart });
//     } catch (error) {
//       res
//         .status(400)
//         .json({ message: "Error occured", errorMessage: error.message });
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       const { cart } = req;
//       await cart.remove();
//       res.json({ message: "DELETED Successfully", cart });
//     } catch (error) {
//       res
//         .status(400)
//         .json({ message: "Error occured", errorMessage: error.message });
//     }
//   });

module.exports = router;
