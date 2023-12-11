const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Income record must belong to an user'],
  },
  amount: {
    type: Number,
    required: [true, 'Income record must have an amount'],
  },
  note: {
    type: String,
    required: [true, 'Income record must have a note'],
    maxLength: [100, 'Description can be of maximum 100 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
