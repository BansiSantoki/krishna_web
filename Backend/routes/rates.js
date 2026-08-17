const express = require('express');
const Rate = require('../models/Rate');

const router = express.Router();

router.get('/', async (req, res) => {
  const rates = await Rate.find().sort({ date: -1 }).limit(10);
  res.json(rates);
});

module.exports = router;
