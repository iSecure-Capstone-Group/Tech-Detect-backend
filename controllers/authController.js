const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user instance with the hashed password
        const newUser = await User.create({ username: name, email, password: hashedPassword });

        // Optionally, generate a JWT token for the user and include it in the response
        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
            token 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // If the credentials are valid, generate a JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token and user details in the response
        res.status(200).json({ 
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    // Typically, you would instruct the client to delete the stored token.
    res.status(200).json({ message: 'Logout successful. Please delete your token client-side.' });
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate a random reset token (this example does not include sending the email)
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

        await user.save();

        // Send reset token to user's email
        // sendEmail(user.email, resetToken); // Implement this function based on your email service

        res.status(200).json({ message: 'Reset token sent to email.' });
    } catch (error) {
        console.error('Error in forgot password:', error);
        next(error);
    }
};
