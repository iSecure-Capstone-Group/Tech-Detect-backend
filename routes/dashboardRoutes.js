const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define routes for dashboard-related endpoints
router.get('/user-info', dashboardController.getUserInfo);

module.exports = router;