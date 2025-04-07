// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel';
import { UserRole } from '../constants/enums';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role, username } = req.body;

    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      role: role || UserRole.USER,
      username : username
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role, 
      username:newUser.username
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({
        message: 'User registered successfully',
        user: { id: newUser.id, email: newUser.email, role: newUser.role }
      });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      username:user.username
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
