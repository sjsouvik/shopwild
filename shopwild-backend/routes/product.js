const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.route("/product").get(getAllProducts).post(createProduct);

router.param("productId", getProductById);

router
  .route("/product/:productId")
  .get(getProduct)
  .post(updateProduct)
  .delete(deleteProduct);

module.exports = router;
