import express from 'express';
import {
  getUserBookings,
  getBookingById,
  createBooking,
  validateBookingQR
} from '../controllers/bookingController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.get('/validate/:qr', validateBookingQR);

export default router;
