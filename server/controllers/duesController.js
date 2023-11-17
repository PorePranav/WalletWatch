const catchAsync = require('./../utils/catchAsync');
const Due = require('./../models/dueModel');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.checkDueOwnership = catchAsync(async (req, res, next) => {
  const fetchedDue = await Due.findById(req.params.id);
  if (!fetchedDue) {
    return next(new AppError('Due with that id does not exist', 404));
  }
  if (fetchedDue.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are unauthorized to perform this action', 401)
    );
  }
  req.fetchedDue = fetchedDue;
  next();
});

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
  let filter = { user: req.user.id };
  const features = new APIFeatures(Due.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const fetchedDues = await features.query;

  res.status(200).json({
    status: 'success',
    results: fetchedDues.length,
    data: fetchedDues,
  });
});

exports.getDue = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.fetchedDue,
  });
});

exports.updateDue = catchAsync(async (req, res, next) => {
  const updatedDue = await Due.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedDue,
  });
});

exports.deleteDue = catchAsync(async (req, res, next) => {
  const deletedDue = await Due.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: deletedDue,
  });
});
