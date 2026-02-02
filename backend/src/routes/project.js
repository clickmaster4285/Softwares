


import express from 'express';
import Project from '../models/Project.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Get single project
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid project id' });
  }
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
});



// Upload project image
router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});



// Create project (admin only, with image)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.email !== 'admin@demo.com') return res.status(403).json({ message: 'Only admin can add projects' });
    const { title, description, url, tags, status, thumbnail } = req.body;
    if (!title || !description || !url || !thumbnail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const project = await Project.create({
      title, description, url, tags, status, thumbnail, createdBy: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


// Update project (admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.email !== 'admin@demo.com') return res.status(403).json({ message: 'Only admin can update projects' });
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid project id' });
  }
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: new Date() },
    { new: true }
  );
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
});


// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.email !== 'admin@demo.com') return res.status(403).json({ message: 'Only admin can delete projects' });
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid project id' });
  }
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

export default router;
