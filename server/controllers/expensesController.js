const catchAsync = require('../utils/catchAsync');
const Expense = require('./../models/expenseModel');
const handlerFactory = require('./handlerFactory');

exports.createExpense = handlerFactory.createOne(Expense);
exports.getAllExpenses = handlerFactory.getAll(Expense);
exports.getExpense = handlerFactory.getOne(Expense);
exports.updateExpense = handlerFactory.update(Expense);
exports.deleteExpense = handlerFactory.delete(Expense);

exports.getExpenseStats = catchAsync(async (req, res, next) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const statsByCategory = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: '$category',
        totalExpenses: { $sum: '$amount' },
      },
    },
    {
      $sort: { totalExpenses: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        mostExpendedCategory: '$_id',
        totalExpenses: 1,
      },
    },
  ]);

  const stats = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: '$amount' },
        numExpenses: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalExpenses: 1,
        numExpenses: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: { statsByCategory, stats },
  });
});

exports.getCategoryData = catchAsync(async (req, res, next) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const statsByCategory = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: statsByCategory,
  });
});
