
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


// Serve uploaded images statically
import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

export default app;
