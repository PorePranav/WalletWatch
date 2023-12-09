const catchAsync = require('../utils/catchAsync');
const Due = require('./../models/dueModel');
const handlerFactory = require('./handlerFactory');

exports.createDue = handlerFactory.createOne(Due);
exports.getAllDues = handlerFactory.getAll(Due);
exports.getDue = handlerFactory.getOne(Due);
exports.updateDue = handlerFactory.update(Due);
exports.deleteDue = handlerFactory.delete(Due);

exports.getDueStats = catchAsync(async (req, res, next) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const stats = await Due.aggregate([
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
        numDues: { $sum: 1 },
        totalDues: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        numDues: 1,
        totalDues: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});
