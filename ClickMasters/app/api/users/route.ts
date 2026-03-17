import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../lib/models/User';
import dbConnect from '../../../lib/mongoose';
import {  getTokenFromCookies, verifyToken, requireAdmin } from '../../../lib/auth';

import { ensureAdminUser } from '../../../lib/ensureAdmin';

// POST /api/users/login
export async function POST(req: NextRequest) {
  await ensureAdminUser();
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
    
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: 'Only admin can login' }, { status: 403 });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    
    const response = NextResponse.json({ id: user._id, email: user.email });
    response.cookies.set('token', token, { 
      httpOnly: true, 
      sameSite: 'lax', 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 
    });
    
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.message.includes('not connected')) {
      return NextResponse.json({ message: 'Database connection failed. Check MONGODB_URI.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
  }
}

// POST /api/users/logout
export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('token');
  return response;
}

// GET /api/users/me
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const token = getTokenFromCookies();
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
