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
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
