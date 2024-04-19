require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const securityRoutes = require('./routes/securityRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
db.authenticate()
  .then(() => {
      console.log('Connected to the database');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

// Cors configuration
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', authMiddleware, dashboardRoutes);
app.use('/incidents', authMiddleware, incidentRoutes);
app.use('/security', authMiddleware, securityRoutes);

// Serve the static files from the React build directory
const frontendBuildPath = path.resolve(__dirname, '..', 'Tech-Detect-final', 'build');
console.log('Serving static files from:', frontendBuildPath);
app.use(express.static(frontendBuildPath));

// Define a route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
