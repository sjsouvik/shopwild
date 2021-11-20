const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");

const {
  getAllCarts,
  getCart,
  addItemToCart,
  updateCart,
  deleteItemFromCart,
} = require("../controllers/cart");

router.param("userId", getUserById);

router
  .route("/cart/:userId")
  .get(getCart)
  .post(addItemToCart)
  .delete(deleteItemFromCart);

router.route("/cart/update/:userId").post(updateCart);

router.get("/cart", getAllCarts);

module.exports = router;
