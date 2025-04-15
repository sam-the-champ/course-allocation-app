const mongoose = require('mongoose');

// Connect to MongoDB using the connection string from the .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
