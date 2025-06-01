import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug format is invalid. Use lowercase letters, numbers, and hyphens only'],
    index: true, // Add index for faster queries
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
      message: '{VALUE} is not a valid category'
    },
    index: true, // Add index for category filtering
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
        required: false, // Not required if Bangla is provided
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
      },
      description: { 
        type: String, 
        required: false,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
      },
      body: { 
        type: String, 
        required: false // Not required if Bangla is provided
      },
    },
    bn: {
      title: { 
        type: String, 
        required: false, // Not required if English is provided
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
      },
      description: { 
        type: String, 
        required: false,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
      },
      body: { 
        type: String, 
        required: false // Not required if English is provided
      },
    },
  },
  thumbnail: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty string
        
        // Check for Google Drive direct links
        if (v.includes('drive.google.com/uc?export=view&id=')) {
          return true;
        }
        
        // Check for standard URLs
        const standardUrlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/ .-]*)*\/?$/;
        
        // Check for more complex URLs with query parameters
        const complexUrlPattern = /^(https?:\/\/)(([\da-z.-]+)\.([a-z.]{2,6})|(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{1,5})?(\/[\w .-]*)*\/?([\?&][\w=&]+)*/;
        
        return standardUrlPattern.test(v) || complexUrlPattern.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent modification after creation
    index: true, // Add index for sorting by date
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  // Add timestamps option to automatically handle createdAt/updatedAt
  timestamps: true,
  // Add virtuals to JSON output
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
blogSchema.index({
  'content.en.title': 'text',
  'content.en.description': 'text',
  'content.bn.title': 'text',
  'content.bn.description': 'text'
});

// Pre-save middleware to ensure updatedAt is set correctly and validate at least one language content
blogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Validate that at least one language has both title and body
  const hasEnglishContent = this.content?.en?.title && this.content?.en?.body;
  const hasBanglaContent = this.content?.bn?.title && this.content?.bn?.body;
  
  if (!hasEnglishContent && !hasBanglaContent) {
    return next(new Error('At least one language (English or Bangla) must have both title and body content'));
  }
  
  next();
});

// Add a virtual property for formatted date
blogSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Add method to check if blog is new (less than 7 days old)
blogSchema.methods.isNew = function() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return this.createdAt > oneWeekAgo;
};

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
