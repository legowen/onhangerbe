const orderController = {};
const Order = require("../models/Order");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");

orderController.createOrder = async (req, res) => {
  try {
    //receiving all data from FE
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;
    // check&update stock
    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );
    //check not enough stocked Item => Error
    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce(
        (total, item) => (total += item.message),
        ""
      );
      throw new Error(errorMessage);
    }
    // Create Order
    const newOrder = new Order({
      userId,
      totalPrice,
      shipTo,
      contact,
      items: orderList,
      orderNum: randomStringGenerator(), //Create order#
    });

    await newOrder.save();
    //After Save, Clear Cart
    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = orderController;
