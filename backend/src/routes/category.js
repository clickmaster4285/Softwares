import express from 'express';
import Category from '../models/Category.js';
import Project from '../models/Project.js';
import mongoose from 'mongoose';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all categories (non-deleted)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false })
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category id' });
    }
    const category = await Category.findById(req.params.id).populate('createdBy', 'email');
    if (!category || category.deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Create category (admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category with same name already exists (non-deleted)
    const existing = await Category.findOne({ 
      name: name.trim(), 
      deleted: false 
    });
    if (existing) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || '',
      createdBy: req.user.id
    });
    
    const populated = await Category.findById(category._id).populate('createdBy', 'email');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Category creation error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update category (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category id' });
    }

    const { name, description } = req.body;
    const updateData = {};

    if (name !== undefined) {
      if (!name || !name.trim()) {
        return res.status(400).json({ message: 'Category name cannot be empty' });
      }
      // Check if another category with same name exists (non-deleted)
      const existing = await Category.findOne({ 
        name: name.trim(), 
        deleted: false,
        _id: { $ne: req.params.id }
      });
      if (existing) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
      updateData.name = name.trim();
    }

    if (description !== undefined) {
      updateData.description = description || '';
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('createdBy', 'email');

    if (!category || category.deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error('Category update error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete category (soft delete, admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid category id' });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Category deletion error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


router.get('/project-data/of-category-wise',  async (req, res) => {
  try {
    // Fetch all categories that are not deleted
    const categories = await Category.find({ deleted: false }).lean();

    // For each category, fetch its projects
    const data = await Promise.all(
      categories.map(async (cat) => {
        const projects = await Project.find({ category: cat._id }).lean();
        return {
          category: cat.name,
          items: projects.map((proj) => ({
            id: proj._id,       // Include project ID
            title: proj.title,  // Project title
            title: proj.title,  // Project title
            url: proj.url,
          })),
        };
      })
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


export default router;
