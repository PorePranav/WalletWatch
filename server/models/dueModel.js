const mongoose = require('mongoose');

const dueSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Due record must belong to an user'],
  },
  amount: {
    type: Number,
    required: [true, 'Due record must have an amount'],
  },
  dueTo: {
    type: String,
    required: [true, 'Due record must have a field to whom the amount is due'],
  },
  dueOn: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Due = mongoose.model('Due', dueSchema);

module.exports = Due;
