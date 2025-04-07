// utils/generateToken.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user: { id: number; email: string; role: string; username:string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '7d'
  });
};
