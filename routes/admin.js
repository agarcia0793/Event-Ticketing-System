import express from 'express';
import { getAdminDashboard } from '../controllers/adminDashboardController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);      // check if logged in
router.use(adminOnly);    // check if admin

router.get('/dashboard', getAdminDashboard);

export default router;
