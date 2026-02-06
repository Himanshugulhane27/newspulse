const express = require('express');
const router = express.Router();

// simple health check endpoint for monitoring
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memUsage = process.memoryUsage();

  res.json({
    status: 'ok',
    uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
    memory: {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`
    },
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

module.exports = router;
