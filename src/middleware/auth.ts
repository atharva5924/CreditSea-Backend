import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { UserRole } from '../constants/enums';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload extends DefaultJwtPayload {
  id: number;
  email: string;
  role: UserRole;
  username : string;
}

// Extend Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authentication token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
      next();
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
