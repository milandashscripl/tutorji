const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

// 🔒 Middleware to verify token and attach user to request
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure you have JWT_SECRET in .env

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User not found.' });

      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) return res.status(401).json({ message: 'No token provided' });
};
