exports.protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
  
      if (!req.user) return res.status(401).json({ message: 'User not found.' });
  
      next();
    } catch (err) {
      console.error('JWT Error:', err); // Add debug log
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  