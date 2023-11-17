const catchAsync = require('./../utils/catchAsync');
const Expense = require('./../models/expenseModel');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.createExpense = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const newExpense = await Expense.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newExpense,
    },
  });
});

exports.getAllExpenses = catchAsync(async (req, res, next) => {
  let filter = { user: req.user.id };
  const features = new APIFeatures(Expense.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const fetchedExpenses = await features.query;

  res.status(200).json({
    status: 'success',
    results: fetchedExpenses.length,
    data: fetchedExpenses,
  });
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const fetchedExpense = await Expense.findById(req.params.id);
  if (!fetchedExpense) {
    return next(new AppError('Expense with that id does not exist', 404));
  }
  if (fetchedExpense.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: fetchedExpense,
    },
  });
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const fetchedExpense = await Expense.findById(req.params.id);
  if (!fetchedExpense)
    return next(new AppError('No document with that id was found', 404));
  if (fetchedExpense.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedExpense,
    },
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  const fetchedExpense = await Expense.findById(req.params.id);
  if (!fetchedExpense)
    return next(new AppError('No expense with that id was found', 404));
  if (fetchedExpense.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }
  const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: deletedExpense,
  });
});
