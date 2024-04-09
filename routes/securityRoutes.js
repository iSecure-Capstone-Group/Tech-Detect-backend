const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

// Define routes for security-related endpoints
router.post('/enable-feature', securityController.enableFeature);

module.exports = router;