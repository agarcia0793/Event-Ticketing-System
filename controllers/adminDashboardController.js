import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();

    const events = await Event.find().lean();

    const data = await Promise.all(
      events.map(async (event) => {
        const bookings = await Booking.find({ event: event._id })
          .populate('user', 'name email')
          .lean();

        return {
          event,
          bookings
        };
      })
    );

    res.json({
      summary: {
        totalEvents,
        totalBookings,
        totalUsers
      },
      dashboard: data
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};

