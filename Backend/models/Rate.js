const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  gold: { type: Number, required: true },
  currency: { type: String, default: 'INR' }
});

module.exports = mongoose.model('Rate', RateSchema);
