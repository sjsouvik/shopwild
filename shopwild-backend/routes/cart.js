const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");

const {
  getAllCarts,
  getCart,
  createUpdateCart,
  deleteItemFromCart,
} = require("../controllers/cart");

router.param("userId", getUserById);

router
  .route("/cart/:userId")
  .get(getCart)
  .post(createUpdateCart)
  .delete(deleteItemFromCart);

router.get("/cart", getAllCarts);

module.exports = router;
