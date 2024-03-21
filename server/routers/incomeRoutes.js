const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const incomesController = require('./../controllers/incomesController');
const handlerFactory = require('./../controllers/handlerFactory');
const Income = require('./../models/incomeModel');

router.use(authController.protect);

router
  .route('/')
  .get(incomesController.getAllIncomes)
  .post(incomesController.createIncome);
router.get('/balanceStats', incomesController.getIncomeStats);
router.get('/monthlyIncome', incomesController.getMonthlyIncome);

router
  .route('/:id')
  .get(handlerFactory.checkOwnership(Income), incomesController.getIncome)
  .patch(handlerFactory.checkOwnership(Income), incomesController.updateIncome)
  .delete(
    handlerFactory.checkOwnership(Income),
    incomesController.deleteIncome
  );

module.exports = router;
