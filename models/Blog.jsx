import mongoose from 'mongoose';

const createBlogSchema = () => {
  return new mongoose.Schema(
    {
      category: { type: String, required: true },
      headline: { type: String, required: true },
      subHeadline: { type: String },
      content: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      tags: { type: [String], default: [] },
      author: { type: String, default: 'Ahsan Himu'},
      pinned: { type: Boolean, default: false },
      thumbnail: { type: String },
      imageUrl: { type: String },
      image2Url: { type: String },
      image3Url: { type: String },
    },
    { timestamps: true }
  );
};

// Dynamic function to get the model based on the category
export const getCategoryBlogModel = (category) => {
  const collectionName = `${category.toLowerCase()}_Blogs`; // Create a collection name, e.g., 'education_Blogs'
  
  return mongoose.models[collectionName] || mongoose.model(collectionName, createBlogSchema());
};
