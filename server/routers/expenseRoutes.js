const express = require('express');
const expenseController = require('./../controllers/expensesController');
const router = express.Router();

router
  .route('/')
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);

module.exports = router;
