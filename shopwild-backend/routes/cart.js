const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");

const {
  getAllCarts,
  getCart,
  createUpdateCart,
} = require("../controllers/cart");

router.param("userId", getUserById);

router.route("/cart/:userId").get(getCart).post(createUpdateCart);

router.get("/cart", getAllCarts);

module.exports = router;
