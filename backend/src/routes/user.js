import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};


// Only allow login for admin@demo.com
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL; 
  try {

    if (!ADMIN_EMAIL) return res.status(500).json({ message: 'ADMIN_EMAIL not configured' });
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'JWT_SECRET not configured' });
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    if (email !== ADMIN_EMAIL) {
      console.log('Email mismatch. Expected:', ADMIN_EMAIL, 'Got:', email);
      return res.status(403).json({ message: 'Only admin can login' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, cookieOptions);
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.json({ message: 'Logged out' });
});

// Get current user
router.get('/me', requireAuth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
