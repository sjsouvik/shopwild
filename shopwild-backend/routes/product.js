const express = require("express");
const router = express.Router();

const { getCategoryById } = require("../controllers/category");

const {
  getProductById,
  createProduct,
  getProduct,
  getAllProducts,
  getProducts,
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

router.param("categoryId", getCategoryById);

router.get("/products/:categoryId", getProducts);

module.exports = router;
