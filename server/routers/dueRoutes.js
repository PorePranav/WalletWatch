const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const duesController = require('./../controllers/duesController');
const handlerFactory = require('./../controllers/handlerFactory');
const Due = require('./../models/dueModel');

router.use(authController.protect);

router.route('/').get(duesController.getAllDues).post(duesController.createDue);
router
  .route('/:id')
  .get(handlerFactory.checkOwnership(Due), duesController.getDue)
  .patch(handlerFactory.checkOwnership(Due), duesController.updateDue)
  .delete(handlerFactory.checkOwnership(Due), duesController.deleteDue);
module.exports = router;
