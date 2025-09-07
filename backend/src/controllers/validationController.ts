import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

// Middleware array to validate login form inputs
export const validateLogin = [
  body('username')
    .trim() // Remove leading/trailing spaces
    .notEmpty()
    .withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  // Middleware to handle validation results
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/login', {
        title: 'Admin Login',
        errors: errors.array(),
      });
    }
    next();
  },
];
