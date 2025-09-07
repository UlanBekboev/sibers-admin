import { Request, Response, NextFunction } from 'express';

// Middleware to check if the admin is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Check if session exists and contains adminId
  if (req.session && (req.session as any).adminId) {
    return next();
  }
  return res.redirect('/login');
}
