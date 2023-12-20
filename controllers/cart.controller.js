const Cart = require("../models/Cart");

const cartController = {};

cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, size, qty } = req.body;
    // Find Cart with User 1.
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      //if User has no Cart, Make Cart 2.
      cart = new Cart({ userId });
      await cart.save();
    }

    // Check Product already exist in the cart 3-1
    const existItem = cart.items.find(
      (item) => item.productId.equals(productId) && item.size === size
    );
    if (existItem) {
      // If yes, Send Error 3-2, If no => 4
      throw new Error("Item already in the Cart");
    }
    // Add Item into Cart 4
    cart.items = [...cart.items, { productId, size, qty }];
    await cart.save();

    res
      .status(200)
      .json({ status: "success", data: cart, cartItemQty: cart.items.length });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    res.status(200).json({ status: "success", data: cart.items });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = cartController;
