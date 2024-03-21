const Expense = require('./../models/expenseModel');
const Income = require('./../models/incomeModel');
const handlerFactory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const { subMonths } = require('date-fns');

exports.createIncome = handlerFactory.createOne(Income);
exports.getAllIncomes = handlerFactory.getAll(Income);
exports.getIncome = handlerFactory.getOne(Income);
exports.updateIncome = handlerFactory.update(Income);
exports.deleteIncome = handlerFactory.delete(Income);

exports.getIncomeStats = catchAsync(async (req, res, next) => {
  const [totalExpenses, totalIncome] = await Promise.all([
    Expense.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]),
    Income.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]),
  ]);

  const expenses = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
  const income = totalIncome.length > 0 ? totalIncome[0].total : 0;
  const balance = income - expenses;

  res.status(200).json({
    status: 'success',
    data: {
      expenses,
      income,
      balance,
    },
  });
});

exports.getMonthlyIncome = catchAsync(async (req, res, next) => {
  const twelveMonthsAgo = subMonths(new Date(), 11);

  const result = await Income.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: { $gte: twelveMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        totalIncome: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id.month',
        year: '$_id.year',
        totalIncome: 1,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});
