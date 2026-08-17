const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().limit(100);
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const p = await Product.findOne({ slug: req.params.slug }).populate('category');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

module.exports = router;
