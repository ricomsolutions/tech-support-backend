const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  userId: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending" },
  paymentMethod: { type: String, required: true },
  cardholderName: { type: String, required: true }, // Add cardholderName field
  email: { type: String, required: true }, // Add email field
  billingAddress: { type: String, required: true }, // Add billingAddress field
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
