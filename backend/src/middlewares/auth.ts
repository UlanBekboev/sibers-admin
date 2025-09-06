// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).adminId) {
    return next();
  }
  return res.redirect("/login");
}
