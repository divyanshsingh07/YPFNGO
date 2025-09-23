const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'omgvawellness',
  password: 'omgva.in'
};

// POST /auth/login - Admin login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { username, password } = req.body;
    
    // Check hardcoded credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate token with a fixed admin ID
      const token = generateToken('admin_omgvawellness');
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: {
            id: 'admin_omgvawellness',
            username: ADMIN_CREDENTIALS.username,
            email: 'admin@omgvawellness.com',
            role: 'admin'
          }
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// POST /auth/register - Admin registration (disabled for hardcoded admin)
router.post('/register', (req, res) => {
  res.status(403).json({
    success: false,
    message: 'Admin registration is disabled. Use hardcoded credentials.'
  });
});

// GET /auth/me - Get current admin info
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.admin.id,
        username: req.admin.username,
        email: req.admin.email,
        role: req.admin.role
      }
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// POST /auth/change-password - Change admin password (disabled for hardcoded admin)
router.post('/change-password', auth, (req, res) => {
  res.status(403).json({
    success: false,
    message: 'Password change is disabled for hardcoded admin credentials.'
  });
});

// POST /auth/logout - Logout (client-side token removal)
router.post('/logout', auth, async (req, res) => {
  try {
    // In a JWT-based system, logout is typically handled client-side
    // by removing the token. This endpoint can be used for logging purposes.
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
