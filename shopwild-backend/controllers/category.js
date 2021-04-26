const Category = require("../models/category");

const { extend } = require("lodash");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({ message: "NOT Found the category in DB" });
    }

    req.category = category;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.json({ savedCategory });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save category in DB",
      errorMessage: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get categories",
      errorMessage: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  let { category } = req;
  category.__v = undefined;
  res.json({ category });
};

exports.updateCategory = async (req, res) => {
  try {
    let { category } = req;
    const categoryUpdates = req.body;
    category = extend(category, categoryUpdates);
    category = await category.save();
    res.json({ category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { category } = req;
    await category.remove();
    res.json({ message: "DELETED Successfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
