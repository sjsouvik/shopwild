const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

router.route("/category").get(getCategories).post(createCategory);

router.param("categoryId", getCategoryById);

router
  .route("/category/:categoryId")
  .get(getCategory)
  .post(updateCategory)
  .delete(deleteCategory);

module.exports = router;
