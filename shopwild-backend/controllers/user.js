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

exports.getUser = (req, res) => {
  let { user } = req;
  user.__v = undefined;
  res.json({ user });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get users",
      errorMessage: error.message,
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    let { user } = req;
    const userUpdates = req.body;
    user = extend(user, userUpdates);
    user = await user.save();
    res.json({ user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
