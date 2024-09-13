// routes/paymentRoutes.js
const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent Route
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Check if the amount is valid
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Create the payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to cents
      currency: "usd",
    });

    // Return the client secret to the frontend
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Handle any error during payment intent creation
    res.status(500).json({ error: error.message });
  }
});

// Store order after successful payment
router.post("/create-order", async (req, res) => {
  const {
    cartItems,
    totalAmount,
    userId,
    paymentMethod,
    cardholderName,
    email,
    billingAddress,
  } = req.body;

  try {
    // Create a new order in the database
    const newOrder = new Order({
      cartItems,
      totalAmount,
      userId,
      paymentStatus: "Pending",
      paymentMethod,
      cardholderName, // Add cardholder name
      email, // Add email
      billingAddress, // Add billing address
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Return the order object, including the order ID
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder, // Return the entire order object with ID
    });
  } catch (error) {
    // Handle any error during order creation
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
