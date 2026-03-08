const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'staff', 'admin']).withMessage('Invalid role'),
  body('studentId').if(body('role').equals('student')).notEmpty().withMessage('Student ID is required for student role'),
  body('department').notEmpty().withMessage('Department is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], login);

router.get('/me', authMiddleware, getMe);

module.exports = router;
