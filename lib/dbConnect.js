import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Track connection state
let isConnecting = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;

const connect = async () => {
  // Check if already connected to avoid multiple connections
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    console.log("Connection already in progress, waiting...");
    // Wait for the existing connection attempt to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connect(); // Retry after waiting
  }

  // Validate the MONGO_URI environment variable
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable is not set");
    throw new Error("MONGO_URI environment variable is not set");
  }

  try {
    isConnecting = true;
    console.log("Connecting to MongoDB..."); // Logging connection attempt
    
    // Configure mongoose connection with improved settings
    await mongoose.connect(process.env.MONGO_URI, {
      // These options improve connection reliability
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds instead of 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // Auto reconnect if connection is lost
      autoIndex: true, // Build indexes
    });
    
    // Reset connection state on success
    isConnecting = false;
    connectionRetries = 0;
    console.log("Connected to MongoDB successfully!");
    
    // Set up connection error handler for future errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    // Handle disconnection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected, attempting to reconnect...');
    });
    
  } catch (error) {
    isConnecting = false;
    connectionRetries++;
    
    console.error(`Failed to connect to MongoDB (Attempt ${connectionRetries}/${MAX_RETRIES}):`, error);
    
    // Retry connection with exponential backoff if under max retries
    if (connectionRetries < MAX_RETRIES) {
      const backoffTime = Math.pow(2, connectionRetries) * 1000; // Exponential backoff
      console.log(`Retrying connection in ${backoffTime/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      return connect(); // Retry connection
    }
    
    throw new Error(`Couldn't connect to MongoDB after ${MAX_RETRIES} attempts: ${error.message}`);
  }
};

export default connect;