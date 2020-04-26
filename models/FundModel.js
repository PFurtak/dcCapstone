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
  
  stocks: [{
    security: String, 
    ticker: String, 
    amount: Number, 
    priceWhenAdded: Number, 
    dateWhenAdded: Date

  }]
});

module.exports = mongoose.model('fund', FundSchema);
