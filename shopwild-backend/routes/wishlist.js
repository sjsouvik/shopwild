const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const {
  getWishlist,
  createUpdateWishlist,
} = require("../controllers/wishlist");

router.param("userId", getUserById);

router.route("/wishlist/:userId").get(getWishlist).post(createUpdateWishlist);

module.exports = router;
