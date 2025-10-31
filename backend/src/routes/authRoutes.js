// src/routes/authRoutes.js
// Defines routes for user registration and login.
import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [body('email').isEmail().withMessage('Valid email is required'), body('password').exists()],
  validateRequest,
  login
);

export default router;
