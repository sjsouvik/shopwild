const express = require("express");
const router = express.Router();

const User = require("../models/user");

const { extend } = require("lodash");

const { getUserById } = require("../controllers/user");

router
  .route("/user")
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (error) {
      res.status(500).json({
        message: "Unable to get users",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json({ savedUser });
    } catch (error) {
      res.status(500).json({
        message: "Unable to save user in DB",
        errorMessage: error.message,
      });
    }
  });

router.param("userId", getUserById);

router
  .route("/user/:userId")
  .get(async (req, res) => {
    let { user } = req;
    user.__v = undefined;
    res.json({ user });
  })
  .post(async (req, res) => {
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
  });

module.exports = router;
