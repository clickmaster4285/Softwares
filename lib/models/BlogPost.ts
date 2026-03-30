import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, sparse: true, index: true, default: '' },
    published: { type: Boolean, default: false },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
