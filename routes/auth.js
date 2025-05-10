import express from 'express';
import { getAdminDashboard } from '../controllers/adminDashboardController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly); // restrict to admin

router.get('/dashboard', getAdminDashboard);

export default router;
