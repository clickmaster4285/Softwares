
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.js';
import projectRoutes from './src/routes/project.js';
import categoryRoutes from './src/routes/category.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

dotenv.config();

const app = express();
console.log("the frontend is", process.env.FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Ensure uploads directory exists and serve statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

const PORT = process.env.PORT;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const ensureAdminUser = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is  missing. Admin initialization skipped.');
    return;
  }
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) return;
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({ email: ADMIN_EMAIL, password: hashed });
};

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await ensureAdminUser();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();
