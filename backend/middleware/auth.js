const jwt = require('jsonwebtoken');

// Hardcoded admin info
const HARDCODED_ADMIN = {
  id: 'admin_omgvawellness',
  username: 'omgvawellness',
  email: 'admin@omgvawellness.com',
  role: 'admin'
};

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is for our hardcoded admin
    if (decoded.id === HARDCODED_ADMIN.id) {
      req.admin = HARDCODED_ADMIN;
      next();
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token or admin not found.' 
      });
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired.' 
      });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.' 
    });
  }
};

module.exports = auth;
