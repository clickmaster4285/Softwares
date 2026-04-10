import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  showOnHome: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema);

// In dev hot-reload, an existing model may be cached without newly added paths.
if (!CategoryModel.schema.path('showOnHome')) {
  CategoryModel.schema.add({ showOnHome: { type: Boolean, default: false } });
}

export default CategoryModel;

