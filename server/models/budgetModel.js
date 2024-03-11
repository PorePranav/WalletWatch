const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Budget record must belong to an user'],
  },
  budgetTotal: {
    type: Number,
  },
  budgetBreakup: {
    required: [true, 'Breakup of a budget should be defined'],
    type: Map,
    of: Number,
  },
  budgetStart: {
    required: [true, 'Breakup must have a start date'],
    type: Date,
  },
  budgetEnd: {
    required: [true, 'Breakup must have an end date'],
    type: Date,
  },
});

budgetSchema.pre('save', async function (next) {
  for (const [key, value] of this.budgetBreakup) this.budgetTotal += value;
  next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
