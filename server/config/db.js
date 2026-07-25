const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.log('[INFO] MongoDB URI not detected in environment. Running with in-memory dataset.');
      return false;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`[OK] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[ERROR] MongoDB Connection Error: ${error.message}`);
    console.log('[WARN] Falling back to in-memory datasets.');
    return false;
  }
};

module.exports = connectDB;
