// src/routes/modRoutes.js
const express = require('express');
const modController = require('../controllers/modController');

const router = express.Router();

// POST /api/mod/rebalance
router.post('/rebalance', modController.rebalanceAllUsers);

module.exports = router;
