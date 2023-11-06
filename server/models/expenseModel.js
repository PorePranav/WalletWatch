const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  note: {
    type: String,
    maxLength: [100, 'Description can be of maximum 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'An expense must have a category'],
    enum: [
      'housing',
      'transportation',
      'food-groceries',
      'healthcare',
      'debt-payments',
      'personal-lifestyle',
      'savings-investments',
      'educational',
      'miscellaneous',
    ],
  },
  amount: {
    type: Number,
    required: [true, 'An expense must have an amount'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Expense must belong to an user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
