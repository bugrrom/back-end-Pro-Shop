// Core
import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
// Instruments
import { getPassword } from '.';
import { Users } from '../controllers';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Basic')) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, getPassword());
      // @ts-ignore
      const user = await new Users(decoded.id).getUserById();
      if (user.message) {
        res.status(user.status).json({ message: user.message });
      }
      // @ts-ignore
      req.user = {
        email: user.email,
        name: user.name,
        _id: user._id,
        isAdmin: user.isAdmin,

      };
      next();
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
