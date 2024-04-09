const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

// Define routes for incident-related endpoints
router.post('/create-incident', incidentController.createIncident);

module.exports = router;