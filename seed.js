import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Event from './models/Event.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    const event = await Event.create({
      title: 'NodeConf 2025',
      description: 'Annual Node.js conference',
      category: 'Tech',
      venue: 'Online',
      date: new Date('2025-08-01'),
      time: '10:00 AM',
      seatCapacity: 100,
      price: 49.99
    });

    console.log('Seed successful ✅');
    console.log(`Admin Email: ${admin.email} | Password: admin123`);
    process.exit();
  } catch (err) {
    console.error('Seed error ❌', err);
    process.exit(1);
  }
};

seed();
