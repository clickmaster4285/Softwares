import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  url: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [String],
  status: { type: String, enum: ['live', 'in-progress', 'completed'], default: 'in-progress' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);