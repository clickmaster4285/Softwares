import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, sparse: true, index: true, default: '' },
    published: { type: Boolean, default: false },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    readTimeMinutes: { type: Number, default: 1, min: 1 },
    author: { type: String, default: '' },
    authorLinkedin: { type: String, default: '' },
    authorImage: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    category: { type: String, default: '', index: true },
    tags: { type: [String], default: [] },
    faqs: {
      type: [
        new mongoose.Schema(
          {
            question: { type: String, required: true },
            answer: { type: String, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const existingModel = mongoose.models.BlogPost as mongoose.Model<any> | undefined;

if (existingModel) {
  // In dev hot-reload, model can stay cached with old schema.
  // Ensure new fields are present so writes persist.
  if (!existingModel.schema.path('readTimeMinutes')) {
    existingModel.schema.add({ readTimeMinutes: { type: Number, default: 1, min: 1 } });
  }
  if (!existingModel.schema.path('authorLinkedin')) {
    existingModel.schema.add({ authorLinkedin: { type: String, default: '' } });
  }
  if (!existingModel.schema.path('authorImage')) {
    existingModel.schema.add({ authorImage: { type: String, default: '' } });
  }
  if (!existingModel.schema.path('faqs')) {
    existingModel.schema.add({
      faqs: {
        type: [
          new mongoose.Schema(
            {
              question: { type: String, required: true },
              answer: { type: String, required: true },
            },
            { _id: false }
          ),
        ],
        default: [],
      },
    });
  }
}

export default existingModel || mongoose.model('BlogPost', blogPostSchema);
