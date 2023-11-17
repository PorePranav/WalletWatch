const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const duesController = require('./../controllers/duesController');

router.use(authController.protect);

router.route('/').get(duesController.getAllDues).post(duesController.createDue);
router
  .route('/:id')
  .get(duesController.checkDueOwnership, duesController.getDue)
  .patch(duesController.checkDueOwnership, duesController.updateDue)
  .delete(duesController.checkDueOwnership, duesController.deleteDue);
module.exports = router;
