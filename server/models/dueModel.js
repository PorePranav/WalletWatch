const mongoose = require('mongoose');

const dueSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Due record must belong to a user'],
  },
  amount: {
    type: Number,
    required: [true, 'Due record must have an amount'],
  },
  dueTo: {
    type: String,
    required: [true, 'Due record must have a field to whom the amount is due'],
  },
  direction: {
    type: String,
    enum: ['incoming', 'outgoing'],
    required: true,
  },
  dueOn: {
    type: Date,
  },
  currentStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Due = mongoose.model('Due', dueSchema);

module.exports = Due;
