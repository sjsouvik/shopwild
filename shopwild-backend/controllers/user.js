const User = require("../models/user");

const { extend } = require("lodash");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "NOT Found the user" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
