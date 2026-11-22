const mongoose = require('mongoose');

// Track database connection states: 'not_configured' | 'connecting' | 'connected' | 'disconnected'
let dbState = 'not_configured';

/**
 * Returns current database connection status
 * @returns {'not_configured' | 'connecting' | 'connected' | 'disconnected'}
 */
function getDBStatus() {
  if (mongoose.connection.readyState === 1) {
    return 'connected';
  }
  if (mongoose.connection.readyState === 2) {
    return 'connecting';
  }
  return dbState;
}

/**
 * Connect to MongoDB Atlas using Mongoose
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    dbState = 'not_configured';
    console.warn('[MongoDB] MONGODB_URI is not configured in environment variables. Server will continue with database status: not_configured.');
    return;
  }

  dbState = 'connecting';

  // Event listeners for connection lifecycle
  mongoose.connection.on('connected', () => {
    dbState = 'connected';
    console.log('[MongoDB] Connected successfully.');
  });

  mongoose.connection.on('error', () => {
    dbState = 'disconnected';
    console.error('[MongoDB] Connection error.');
  });

  mongoose.connection.on('disconnected', () => {
    dbState = 'disconnected';
    console.warn('[MongoDB] Connection disconnected.');
  });

  try {
    await mongoose.connect(uri);
    dbState = 'connected';
  } catch (err) {
    dbState = 'disconnected';
    console.error('[MongoDB] Failed to connect to MongoDB Atlas. Ensure your IP is whitelisted and credentials are correct.');
  }
}

module.exports = {
  connectDB,
  getDBStatus,
};
