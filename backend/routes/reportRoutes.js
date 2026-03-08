const express = require('express');
const {
  getDashboardStats,
  getBorrowHistory,
  getResourceUtilization,
  getUserActivity,
} = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/dashboard', getDashboardStats);
router.get('/borrow-history', getBorrowHistory);
router.get('/resource-utilization', getResourceUtilization);
router.get('/user-activity', getUserActivity);

module.exports = router;
