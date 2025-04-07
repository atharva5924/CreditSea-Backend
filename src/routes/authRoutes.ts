// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)



export default router;
