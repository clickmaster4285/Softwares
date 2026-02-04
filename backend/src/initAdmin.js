import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const DEMO_EMAIL = process.env.ADMIN_EMAIL;
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD;

async function initAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  if (!DEMO_EMAIL || !DEMO_PASSWORD) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD not configured');
    process.exit(1);
  }
  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    console.log('Admin already exists:', DEMO_EMAIL);
    process.exit(0);
  }
  const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);
  await User.create({ email: DEMO_EMAIL, password: hashed });
  console.log('Admin created:', DEMO_EMAIL);
  process.exit(0);
}

initAdmin().catch(err => {
  console.error('Error initializing admin:', err);
  process.exit(1);
});
