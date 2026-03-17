import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from './mongoose';
import User from './models/User';

let initialized = false;

export async function ensureAdminUser() {
  if (initialized) return;
  
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD missing. Admin user not created.');
    return;
  }

  await dbConnect();
  
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin user already exists');
    initialized = true;
    return;
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({ 
    email: ADMIN_EMAIL, 
    password: hashed 
  });
  
  console.log('Admin user created successfully');
  initialized = true;
}
