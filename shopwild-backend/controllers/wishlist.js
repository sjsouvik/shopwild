const Wishlist = require("../models/wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate("user")
      .populate("products.product");
    res.json({ wishlist });
  } catch (error) {
    res.status(404).json({
      message: "Unable to get the cart for the user",
      errorMessage: error.message,
    });
  }
};

exports.createUpdateWishlist = async (req, res) => {
  try {
    const wishlistUpdates = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    wishlistUpdates.user = req.user;

    if (wishlist === null) {
      wishlist = new Wishlist(wishlistUpdates);
      wishlist = await wishlist.save();
      return res.json({ message: "Created wishlist for the user", wishlist });
    } else {
      const wishlistItem = wishlist.products.find(
        (item) => item.product == wishlistUpdates.products[0].product
      );

      if (wishlistItem) {
        await Wishlist.updateOne(
          {
            "products.product": wishlistUpdates.products[0].product,
          },
          {
            $set: {
              "products.$.isWishlisted":
                wishlistUpdates.products[0].isWishlisted,
            },
          }
        );
      } else {
        await Wishlist.updateOne(
          { user: wishlistUpdates.user },
          { $push: { products: wishlistUpdates.products[0] } }
        );
      }
    }

    res.json({ message: "Successfully updated the wishlist" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
