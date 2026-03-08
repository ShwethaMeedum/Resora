const express = require('express');
const { body } = require('express-validator');
const {
  createBorrowRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
  markAsBorrowed,
  markAsReturned,
} = require('../controllers/borrowController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { borrowRequestValidation } = require('../utils/validators');

const router = express.Router();

router.post('/', [
  authMiddleware,
  roleMiddleware(['student', 'staff']),
  borrowRequestValidation,
], createBorrowRequest);

router.get('/my', authMiddleware, getMyRequests);

router.get('/all', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
], getAllRequests);

router.put('/:id/approve', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
], approveRequest);

router.put('/:id/reject', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
  body('rejectionReason').optional().isString(),
], rejectRequest);

router.put('/:id/borrowed', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
], markAsBorrowed);

router.put('/:id/return', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
  body('notes').optional().isString(),
], markAsReturned);

module.exports = router;
