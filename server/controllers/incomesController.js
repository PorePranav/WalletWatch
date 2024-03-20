const Income = require('./../models/incomeModel');
const handlerFactory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.createIncome = handlerFactory.createOne(Income);
exports.getAllIncomes = handlerFactory.getAll(Income);
exports.getIncome = handlerFactory.getOne(Income);
exports.updateIncome = handlerFactory.update(Income);
exports.deleteIncome = handlerFactory.delete(Income);

exports.getIncomeStats = catchAsync(async (req, res, next) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const stats = await Income.aggregate([
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
        totalIncome: { $sum: '$amount' },
        numIncomes: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        numIncomes: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});
