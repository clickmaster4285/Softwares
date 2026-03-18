import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from './mongoose';
import User from './models/User';

let initialized = false;

export async function ensureAdminUser() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
  console.log('🔍 Checking admin user...');
  console.log('ADMIN_EMAIL:', ADMIN_EMAIL);
  console.log('ADMIN_PASSWORD:', ADMIN_PASSWORD ? '***' : 'NOT SET');
  
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD missing. Admin user not created.');
    return;
  }

  try {
    await dbConnect();
    console.log('✅ Connected to database');
    
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('✅ Admin user already exists');
      return;
    }

    console.log('📝 Creating admin user...');
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const user = await User.create({ 
      email: ADMIN_EMAIL, 
      password: hashed 
    });
    
    console.log('✅ Admin user created successfully:', user._id);
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);
  }
}
