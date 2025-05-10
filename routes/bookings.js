import express from 'express';
import {
  getUserBookings,
  getBookingById,
  createBooking,
  validateBookingQR
} from '../controllers/bookingController.js';
import { protect } from '../middlewares/auth.js'; 

const router = express.Router();

router.get('/validate/:qr', validateBookingQR);

router.use(protect);

router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);

export default router;

