import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getToken = (req) => req.cookies?.token;

export const requireAuth = async (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('User not found:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = (req, res, next) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL; 
  if (!ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL not configured');
    return res.status(500).json({ message: 'ADMIN_EMAIL not configured' });
  }
  if (req.user?.email !== ADMIN_EMAIL) {
    console.log('User is not admin:', req.user?.email);
    return res.status(403).json({ message: 'Only admin can access this route' });
  }
  next();
};
