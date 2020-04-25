const mongoose = require('mongoose');

const FundSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  fundName: {
    type: String,
    required: true,
  },
  security: {
    type: String,
  },
  ticker: {
    type: String,
  },
  amount: {
    type: Number,
  },
  priceWhenAdded: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('fund', FundSchema);
