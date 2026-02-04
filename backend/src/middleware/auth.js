import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getToken = (req) => req.cookies?.token;

export const requireAuth = async (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
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
    return res.status(500).json({ message: 'ADMIN_EMAIL not configured' });
  }
  if (req.user?.email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: 'Only admin can access this route' });
  }
  next();
};
