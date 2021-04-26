const Product = require("../models/product");

const { extend } = require("lodash");

exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate(
      "category",
      "name description"
    );

    if (!product) {
      return res.status(404).json({ message: "NOT Found the product in DB" });
    }

    req.product = product;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Unable to save product in DB",
      errorMessage: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find().populate(
      "category",
      "name description"
    );
    res.json({ product });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get products",
      errorMessage: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  let { product } = req;
  product.__v = undefined;
  res.status(200).json({ product });
};

exports.updateProduct = async (req, res) => {
  try {
    let { product } = req;
    const productUpdates = req.body;
    product = extend(product, productUpdates);
    product = await product.save();
    res.json({ product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product } = req;
    await product.remove();
    res.json({ message: "DELETED Successfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
