const catchAsync = require('./../utils/catchAsync');
const Expense = require('./../models/expenseModel');

exports.getAllExpenses = catchAsync(async (req, res, next) => {
  const allExpenses = await Expense.find({});
  res.status(200).json({
    status: 'success',
    results: allExpenses.length,
    data: {
      allExpenses,
    },
  });
});

exports.createExpense = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newExpense = await Expense.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newExpense,
    },
  });
});
