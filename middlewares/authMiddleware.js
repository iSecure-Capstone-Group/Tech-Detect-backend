const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/User');

// Middleware to authenticate incoming requests
const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization;

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Check if decoded token contains user ID
        if (!decoded.userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if user exists
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user object to request for further use
        req.user = user;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;