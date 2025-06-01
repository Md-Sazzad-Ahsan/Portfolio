import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug format is invalid. Use lowercase letters, numbers, and hyphens only'],
    index: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    lowercase: true,
    enum: {
      values: [
        'technology',
        'programming',
        'design',
        'academic',
        'lifestyle',
        'news',
        'tips',
        'general-knowledge',
        'others'
      ],
      message: '{VALUE} is not a valid category',
    },
    index: true,
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  content: {
    en: {
      title: {
        type: String,
        required: false,
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
      },
      description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters'],
      },
      body: {
        type: String,
        required: false,
      },
    },
    bn: {
      title: {
        type: String,
        required: false,
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
      },
      description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters'],
      },
      body: {
        type: String,
        required: false,
      },
    },
  },
  thumbnail: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (!v) return true;
        if (v.includes('drive.google.com/uc?export=view&id=')) return true;
        return isURL(v, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
    index: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Full-text search index
blogSchema.index({
  'content.en.title': 'text',
  'content.en.description': 'text',
  'content.bn.title': 'text',
  'content.bn.description': 'text',
});

// Middleware to ensure at least one language has title + body
blogSchema.pre('save', function (next) {
  const hasEn = this.content?.en?.title && this.content?.en?.body;
  const hasBn = this.content?.bn?.title && this.content?.bn?.body;

  if (!hasEn && !hasBn) {
    return next(new Error('At least one language (English or Bangla) must have both title and body'));
  }

  next();
});

// Virtual for formatted date
blogSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Custom method to check if post is new
blogSchema.methods.isRecentlyCreated = function () {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return this.createdAt > oneWeekAgo;
};

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
