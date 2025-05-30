import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { generateQR } from '../utils/generateQR.js';
import { sendEmail } from '../utils/sendEmail.js';

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('event');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

export const createBooking = async (req, res) => {
  const { event: eventId, quantity } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.bookedSeats + quantity > event.seatCapacity) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    const qrData = `${req.user._id}_${eventId}_${Date.now()}`;
    console.log('QR STRING USED:', qrData);
    await generateQR(qrData); // We don't need the base64 image anymore

    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      quantity,
      qrCode: qrData
    });

    event.bookedSeats += quantity;
    await event.save();

    const subject = 'Your Event Booking Confirmation';
    const html = `<h2>Booking Confirmed</h2>
      <p>Event: ${event.title}</p>
      <p>Quantity: ${quantity}</p>
      <p>Date: ${event.date.toDateString()}</p>
      <p>QR Code: ${qrData}</p>`;

    await sendEmail(req.user.email, subject, html);

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Booking failed' });
  }
};

export const validateBookingQR = async (req, res) => {
  try {
    const booking = await Booking.findOne({ qrCode: req.params.qr }).populate('event');
    if (!booking) return res.status(404).json({ valid: false, message: 'QR code invalid' });
    res.json({ valid: true, booking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to validate QR code' });
  }
};


