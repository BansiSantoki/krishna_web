const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
});

module.exports = router;
