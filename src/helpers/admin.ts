// Core
import { Response, Request, NextFunction } from 'express';

export const admin = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
