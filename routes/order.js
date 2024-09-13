// server/routes/order.js

const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Mongoose model for orders

router.post("/create", async (req, res) => {
  const { cartItems, totalAmount, userId, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      items: cartItems,
      total: totalAmount,
      paymentMethod: paymentMethod,
      status: "paid",
      createdAt: new Date(),
    });

    await newOrder.save();
    res.json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
