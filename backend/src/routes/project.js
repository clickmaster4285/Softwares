


import express from 'express';
import Project from '../models/Project.js';
import mongoose from 'mongoose';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
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

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('category', 'name description')
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
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
router.post('/upload', requireAuth, requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    try {
      if (err) {
        console.error('Multer error:', err.message, err);
        return res.status(400).json({ message: `Upload failed: ${err.message}` });
      }
      if (!req.file) {
        console.error('No file in request');
        return res.status(400).json({ message: 'No file uploaded' });
      }
      res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } catch (error) {
      console.error('Image upload error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
});



// Create project (admin only, with image)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { title, description, url, category, tags, status, thumbnail } = req.body;
    if (!title || !description || !url || !category || !thumbnail) {
      return res.status(400).json({ message: 'Missing required fields (title, description, url, category, thumbnail)' });
    }
    
    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Verify category exists and is not deleted
    const Category = (await import('../models/Category.js')).default;
    const categoryExists = await Category.findOne({ _id: category, deleted: false });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found or deleted' });
    }

    const project = await Project.create({
      title, description, url, category, tags, status, thumbnail, createdBy: req.user.id
    });
    
    const populated = await Project.findById(project._id)
      .populate('category', 'name description')
      .populate('createdBy', 'email');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


// Update project (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project id' });
    }

    // If category is being updated, validate it
    if (req.body.category) {
      if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
      const Category = (await import('../models/Category.js')).default;
      const categoryExists = await Category.findOne({ _id: req.body.category, deleted: false });
      if (!categoryExists) {
        return res.status(400).json({ message: 'Category not found or deleted' });
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )
      .populate('category', 'name description')
      .populate('createdBy', 'email');
    
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error('Project update error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


// Delete project (admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid project id' });
  }
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

export default router;
