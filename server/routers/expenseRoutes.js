const express = require('express');
const expenseController = require('./../controllers/expensesController');
const router = express.Router();
const authController = require('./../controllers/authController');
const handlerFactory = require('./../controllers/handlerFactory');
const Expense = require('./../models/expenseModel');

router.use(authController.protect);

router
  .route('/')
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);

router.get('/expenseStats', expenseController.getExpenseStats);
router.get('/categoryStats', expenseController.getCategoryData);

router
  .route('/:id')
  .get(handlerFactory.checkOwnership(Expense), expenseController.getExpense)
  .patch(
    handlerFactory.checkOwnership(Expense),
    expenseController.updateExpense
  )
  .delete(
    handlerFactory.checkOwnership(Expense),
    expenseController.deleteExpense
  );

module.exports = router;
