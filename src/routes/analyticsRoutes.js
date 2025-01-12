const express = require('express');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// GET /api/analytics
router.get('/', analyticsController.getAnalytics);

module.exports = router;
