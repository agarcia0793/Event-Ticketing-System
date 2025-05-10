import express from 'express';
import {
  getUserBookings,
  getBookingById,
  createBooking,
  validateBookingQR
} from '../controllers/bookingController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/validate/:qr', validateBookingQR);


router.use(auth);

router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);

export default router;

