import mongoose from 'mongoose';

// Reply Schema
const replySchema = new mongoose.Schema(
  {
    replyID: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    commentID: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    reply: { type: [replySchema] },
  },
  { timestamps: true }
);

// Base Blog Schema
const baseBlogSchema = new mongoose.Schema(
  {
    blogNumber: { type: String, required: true, unique: true },
    tags: { type: [String] },
    template: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    pinned: { type: Boolean, default: false },
    author: { type: String, required: true, default: 'Md. Sazzad Ahsan' },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    // Media
    photo: { type: String },
    secondPhoto: { type: String },
    multiplePhoto: { type: [String] },

    // Headline and Content
    headline: { type: String },
    subHeadline: { type: String },
    multipleHeadline: { type: [String] },
    multipleSubHeadline: { type: [String] },
    content: { type: [String] },
    multipleContent: { type: [String] },
    subContent: { type: [String] },
    multipleSubContent: { type: [String] },

    // Notes, Quotes, and Links
    note: { type: String },
    multipleNote: { type: [String] },
    quote: { type: String },
    multipleQuote: { type: [String] },
    link: { type: String },
    secondLink: { type: String },
    multipleLink: { type: [String] },

    // FAQ and Comments
    faq: { type: [String] },
    comments: { type: [commentSchema] },

    // Unique Slug
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, minimize: true }
);

// Define and Export Models Separately
export const TechnologyBlog = mongoose.models.TechnologyBlog || mongoose.model('TechnologyBlog', baseBlogSchema);
export const ProgrammingBlog = mongoose.models.ProgrammingBlog || mongoose.model('ProgrammingBlog', baseBlogSchema);
export const DesignBlog = mongoose.models.DesignBlog || mongoose.model('DesignBlog', baseBlogSchema);
export const AcademicBlog = mongoose.models.AcademicBlog || mongoose.model('AcademicBlog', baseBlogSchema);
export const LifeStyleBlog = mongoose.models.LifeStyleBlog || mongoose.model('LifeStyleBlog', baseBlogSchema);
export const NewsBlog = mongoose.models.NewsBlog || mongoose.model('NewsBlog', baseBlogSchema);
export const TipsBlog = mongoose.models.TipsBlog || mongoose.model('TipsBlog', baseBlogSchema);
export const GKBlog = mongoose.models.GKBlog || mongoose.model('GKBlog', baseBlogSchema);
export const OthersBlog = mongoose.models.OthersBlog || mongoose.model('OthersBlog', baseBlogSchema);
