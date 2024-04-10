const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

exports.register = async (req, res, next) => {
  //Registration Logic
    try {
      const { name, email, password } = req.body;

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Create a new user instance
      const newUser = new User({ name, email, password });

      // Save the user to the database
      await newUser.save();

      // Optionally, you can generate a JWT token for the user and include it in the response
      // const token = generateToken(newUser);

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error);
      next(error);
  }
};

exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the password provided with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // If the credentials are valid, generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token in the response
      res.status(200).json({ token });
  } catch (error) {
      console.error('Error logging in user:', error);
      next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // Perform any necessary cleanup or logout logic
    // For example, you may want to invalidate the user's token stored in the client-side

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out user:', error);
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1. Get user based on email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3. Hash the reset token and save it to user document
    user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

    await user.save();

    // 4. Send reset token to user's email (you'll implement this part separately)
    // Example: sendEmail(user.email, resetToken);

    res.status(200).json({ message: 'Reset token sent to email' });
  } catch (error) {
    next(error);
  }
};