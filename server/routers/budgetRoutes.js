const express = require('express');
const budgetController = require('./../controllers/budgetController');
const authController = require('./../controllers/authController');
const router = express.Router();
const Budget = require('./../models/budgetModel');
const handlerFactory = require('./../controllers/handlerFactory');

router.use(authController.protect);

router
  .route('/')
  .get(budgetController.getAllBudgets)
  .post(budgetController.createBudget);

router
  .route('/:id')
  .get(handlerFactory.checkOwnership(Budget), budgetController.getBudget)
  .patch(handlerFactory.checkOwnership(Budget), budgetController.updateBudget)
  .delete(handlerFactory.checkOwnership(Budget), budgetController.deleteBudget);

module.exports = router;
