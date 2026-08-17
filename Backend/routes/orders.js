const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  const { items, total, user } = req.body;
  const order = await Order.create({ items, total, user });
  res.json(order);
});

module.exports = router;
