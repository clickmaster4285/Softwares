import express from 'express';
import Testimonial from '../models/Testimonial.js';
import mongoose from 'mongoose';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all active testimonials (public - for landing page)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get all testimonials including inactive (admin only)
router.get('/admin', requireAuth, requireAdmin, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Create testimonial (admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { authorName, authorRole, authorCompany, content, avatarUrl, rating, isActive } = req.body;
    if (!authorName || !content) {
      return res.status(400).json({ message: 'Author name and content are required' });
    }
    const testimonial = await Testimonial.create({
      authorName,
      authorRole: authorRole ?? '',
      authorCompany: authorCompany ?? '',
      content,
      avatarUrl: avatarUrl ?? '',
      rating: rating ?? 5,
      isActive: isActive !== false,
    });
    res.status(201).json(testimonial);
  } catch (err) {
    console.error('Testimonial creation error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update testimonial (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid testimonial id' });
    }
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ message: 'Not found' });
    res.json(testimonial);
  } catch (err) {
    console.error('Testimonial update error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid testimonial id' });
  }
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Testimonial deleted' });
});

export default router;
