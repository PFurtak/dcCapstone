const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/UserModel');
const Fund = require('../models/FundModel');

// GET route for api/funds
// Get all users funds
// Private access
router.get('/', auth, async (req, res) => {
  try {
    const funds = await Fund.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(funds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST route for api/funds
// Add fund
// Private access
router.post(
  '/',
  [auth, [check('fundname', 'Fund name is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      fundname,
      amount,
      lastprice,
      purchaseprice,
      security,
      ticker,
    } = req.body;
    try {
      const newFund = new Fund({
        fundname,
        amount,
        lastprice,
        purchaseprice,
        security,
        ticker,
        user: req.user.id,
      });
      const fund = await newFund.save();
      res.json(fund);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// PUT route for api/funds/:id
// update fund
// Private access
router.put('/:id', auth, async (req, res) => {
  const {
    fundname,
    amount,
    lastprice,
    purchaseprice,
    security,
    ticker,
  } = req.body;

  const fundFields = {};
  if (fundname) fundFields.fundname = fundname;
  if (amount) fundFields.amount = amount;
  if (lastprice) fundFields.lastprice = lastprice;
  if (purchaseprice) fundFields.purchaseprice = purchaseprice;
  if (security) fundFields.security = security;
  if (ticker) fundFields.ticker = ticker;

  try {
    let fund = await Fund.findById(req.params.id);
    if (!fund) return res.status(404).json({ msg: 'Fund not found' });

    if (fund.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized.' });
    }
    fund = await Fund.findByIdAndUpdate(
      req.params.id,
      { $set: fundFields },
      { new: true }
    );
    res.json(fund);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE route for api/funds/:id
// delete fund
// Private access
router.delete('/:id', auth, async (req, res) => {
  try {
    let fund = await Fund.findById(req.params.id);
    if (!fund) return res.status(404).json({ msg: 'Fund not found' });

    if (fund.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized.' });
    }
    await Fund.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Fund removed.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
