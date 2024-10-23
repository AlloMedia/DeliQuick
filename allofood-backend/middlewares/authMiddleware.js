const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    
    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    console.log("Token received:", token);

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 

    next(); // Continue to the next middleware/route
  } catch (error) {
    console.error("Auth error:", error.message); // Log the exact error message for debugging
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
