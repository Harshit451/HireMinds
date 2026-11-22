const express = require('express');
const router = express.Router();
const { getDBStatus } = require('../config/db');

/**
 * GET /api/health
 * Health check endpoint reporting application and database statuses separately
 */
router.get('/health', (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    status: 'ok',
    database: {
      status: dbStatus,
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
