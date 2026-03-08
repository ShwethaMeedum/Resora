const express = require('express');
const { body } = require('express-validator');
const {
  getAllResources,
  addResource,
  updateResource,
  deleteResource,
  changeStatus,
  getCategories,
  addCategory,
} = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getAllResources);
router.get('/categories', getCategories);

router.post('/', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
  body('name').notEmpty().withMessage('Resource name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('serialNumber').notEmpty().withMessage('Serial number is required'),
  body('location').notEmpty().withMessage('Location is required'),
], addResource);

router.post('/categories', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
  body('name').notEmpty().withMessage('Category name is required'),
], addCategory);

router.put('/:id', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
], updateResource);

router.delete('/:id', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
], deleteResource);

router.put('/:id/status', [
  authMiddleware,
  roleMiddleware(['staff', 'admin']),
  body('status').isIn(['available', 'maintenance', 'retired']).withMessage('Invalid status'),
], changeStatus);

module.exports = router;
