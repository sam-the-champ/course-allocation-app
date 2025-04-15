const jwt = require('jsonwebtoken');
require('dotenv').config();

// This middleware protects routes by checking for a valid JWT token
const verifyToken = (req, res, next) => {
  // Get token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    // Verify token with your secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user (e.g., { id, role }) to request
    req.user = decoded;
    next(); // Continue to route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
