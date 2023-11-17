const express = require('express');
const expenseController = require('./../controllers/expensesController');
const router = express.Router();
const authController = require('./../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);

router
  .route('/:id')
  .get(expenseController.checkExpenseOwnership, expenseController.getExpense)
  .patch(
    expenseController.checkExpenseOwnership,
    expenseController.updateExpense
  )
  .delete(
    expenseController.checkExpenseOwnership,
    expenseController.deleteExpense
  );

module.exports = router;
