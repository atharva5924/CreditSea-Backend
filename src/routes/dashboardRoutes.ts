import express from 'express';
import { authenticate } from '../middleware/auth';
import { authorizeRoles } from '../middleware/roleMiddleware';
import {
  getUserDashboard,
  getVerifierDashboard,
  getAdminDashboard,
  getFormData,
  getUsers,
  updateUserRole,
  updateStatus
} from '../controllers/dashboardController';
import { UserRole } from '../constants/enums';

const router = express.Router();

router.get('/user', authenticate, authorizeRoles(UserRole.USER), getUserDashboard);
router.get('/verifier', authenticate, authorizeRoles(UserRole.VERIFIER), getVerifierDashboard);
router.get('/admin', authenticate, authorizeRoles(UserRole.ADMIN), getAdminDashboard);
router.post('/user/form', authenticate, authorizeRoles(UserRole.USER), getFormData);
router.get('/admin/users', authenticate, authorizeRoles(UserRole.ADMIN), getUsers);
router.put('/admin/users/update', authenticate, authorizeRoles(UserRole.ADMIN), updateUserRole);
router.put('/verifier/update-status', authenticate, authorizeRoles(UserRole.VERIFIER, UserRole.ADMIN), updateStatus);


export default router;
