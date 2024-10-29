const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'No authentication token provided' 
      });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        message: 'Invalid token format' 
      });
    }

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      
      
      req.user = decoded;
      req.userId = decoded.userId || decoded.user_id;
      
      console.log('Successfully authenticated user:', req.userId);
    //   console.log(userId);
      
      next();
    } catch (jwtError) {
      console.error('JWT Verification Error:', jwtError);
      
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: 'Invalid token',
          error: 'Token verification failed'
        });
      }
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token has expired',
          error: 'Token expired'
        });
      }
      
      throw jwtError; // Re-throw unexpected errors
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ 
      message: 'Authentication failed',
      error: error.message
    });
  }
};

module.exports = authMiddleware;