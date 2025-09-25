import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail URL is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  subTitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true,
    maxlength: [200, 'Subtitle cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  gitHub: {
    type: String,
    trim: true
  },
  web: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);