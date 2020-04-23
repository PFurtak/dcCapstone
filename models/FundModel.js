const mongoose = require('mongoose');

const FundSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  fundname: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  lastprice: {
    type: Number,
  },
  purchaseprice: {
    type: Number,
  },
  security: {
    type: String,
  },
  ticker: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('fund', FundSchema);
