const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the headers
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
