const { body } = require('express-validator');

const borrowRequestValidation = [
  body('resource').notEmpty().withMessage('Resource is required'),
  body('borrowDate').isISO8601().withMessage('Valid borrow date is required'),
  body('returnDate').isISO8601().withMessage('Valid return date is required'),
  body('purpose').notEmpty().withMessage('Purpose is required'),
];

const resourceValidation = [
  body('name').notEmpty().withMessage('Resource name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('serialNumber').notEmpty().withMessage('Serial number is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('condition').isIn(['excellent', 'good', 'fair', 'poor']).withMessage('Invalid condition'),
];

const categoryValidation = [
  body('name').notEmpty().withMessage('Category name is required'),
];

module.exports = {
  borrowRequestValidation,
  resourceValidation,
  categoryValidation,
};
