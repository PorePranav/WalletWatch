const catchAsync = require('./../utils/catchAsync');
const Due = require('./../models/dueModel');
const AppError = require('../utils/appError');

exports.createDue = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const newDue = await Due.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDue,
    },
  });
});

exports.getAllDues = catchAsync(async (req, res, next) => {
  const userDues = await Due.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    results: userDues.length,
    data: {
      data: userDues,
    },
  });
});

exports.getDue = catchAsync(async (req, res, next) => {
  const fetchedDue = await Due.findById(req.params.id);
  if (!fetchedDue) {
    return next(new AppError('The requested due does not exist', 404));
  }
  if (fetchedDue.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: fetchedDue,
    },
  });
});

exports.updateDue = catchAsync(async (req, res, next) => {
  const fetchedDue = await Due.findById(req.params.id);
  if (!fetchedDue) return next(new AppError('No due with that id', 404));
  if (fetchedDue.user.toString() != req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }

  const updatedDue = await Due.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedDue,
    },
  });
});

exports.deleteDue = catchAsync(async (req, res, next) => {
  const fetchedDue = await Due.findById(req.params.id);
  if (!fetchedDue)
    return next(new AppError('No expense with that id was found', 404));
  if (fetchedDue.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }
  const deletedDue = await Due.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: deletedDue,
  });
});
