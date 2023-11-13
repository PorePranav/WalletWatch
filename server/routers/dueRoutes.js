const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const duesController = require('./../controllers/duesController');

router.use(authController.protect);

router.route('/').get(duesController.getAllDues).post(duesController.createDue);
router
  .route('/:id')
  .get(duesController.getDue)
  .patch(duesController.updateDue)
  .delete(duesController.deleteDue);
module.exports = router;
