import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

// const express = require('express');
// const Stripe = require('stripe');
// const dotenv = require('dotenv');

dotenv.config();
// stripe payments
const stripe = Stripe(process.env.STRIPE_SK);
const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', async (req, res) => {
  const products = req.body.orderedItems;
  console.log(products);

  const line_items = req.body.orderItems.map((item) => {
    return {
      price_data: {
        currency: 'ron',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/order-history',
    cancel_url: 'http://localhost:3000/order-history',
    closed: '',
  });

  res.send({ url: session.url });
});

export default stripeRouter;
// module.exports = stripeRouter;
