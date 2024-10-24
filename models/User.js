import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,  
      required: true,
    },
    email: {
      type: String,  
      required: true,
      unique: true,
    },
    password: {
      type: String,  
      required: true, 
    },
    isAdmin: {
      type: Boolean,
      default: false,  // Default is false; only set true for admin users
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);