const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Provide a safe default JWT secret in development so auth doesn't crash
if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev_jwt_secret_change_me';
}

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-hashes'", "https://cdnjs.cloudflare.com", "https://cdn.emailjs.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https://api.emailjs.com"],
      frameSrc: ["'self'", "https://www.google.com"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://omgvawellness.omgva.in', 
        'https://www.omgvawellness.omgva.in',
        process.env.FRONTEND_URL || 'https://omgva-wellness-frontend.vercel.app'
      ] // Your actual domain + Vercel deployment
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving removed - images now stored in database

// Serve frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend')));
}

// API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve frontend files (both development and production)
app.use(express.static(path.join(__dirname, '../frontend')));

// Server-side rendered blog detail page
app.get('/blog/:slug', async (req, res, next) => {
  try {
    const Blog = require('./models/Blog');
    const blog = await Blog.findOne({ slug: req.params.slug, is_published: true });
    if (!blog) {
      return res.status(404).send(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Blog Not Found</title><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-50"><div class="max-w-3xl mx-auto p-6 text-center"><h1 class="text-2xl font-bold mb-2">Blog not found</h1><p class="text-gray-600">The blog you are looking for does not exist.</p><a href="/" class="inline-block mt-6 text-blue-600 hover:underline"><i class="fas fa-arrow-left mr-2"></i>Back to Home</a></div></body></html>`);
    }
    const imageUrl = blog.image_data && blog._id ? `/api/blogs/image/${blog._id}` : '';
    const createdAt = new Date(blog.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const safeTitle = (blog.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeCategory = (blog.category || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizeDescription = (html) => {
      if (!html) return '';
      // Remove script tags for safety, keep normal HTML formatting (strong, h2, p, ul, li, etc.)
      return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    };
    const descriptionHtml = sanitizeDescription(blog.description || '').replace(/\n/g, '<br>');

    // Determine Home URL for the Back to Home button
    const referer = req.get('Referer') || '';
    let homeUrl = process.env.FRONTEND_URL || '/';
    if (/127\.0\.0\.1:5500|localhost:5500/.test(referer)) {
      homeUrl = 'http://127.0.0.1:5500/frontend/index.html';
    }
    const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    :root{--text:#1f2937;--muted:#6b7280;--bg:#f7fafc;--card:#ffffff;--brand:#2563eb;--chipFrom:#fb923c;--chipTo:#f97316}
    *{box-sizing:border-box}
    html,body{margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text)}
    a{text-decoration:none;color:var(--brand)}
    .container{max-width:1100px;margin:0 auto;padding:0 16px}
    .card{background:var(--card);border-radius:16px;box-shadow:0 10px 24px rgba(0,0,0,.08);overflow:hidden}
    .hero{position:relative;height:260px}
    .hero img{width:100%;height:100%;object-fit:cover;display:block}
    .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.45),rgba(0,0,0,.15))}
    .hero-content{position:absolute;left:0;right:0;bottom:0;padding:20px}
    h1{font-size:28px;margin:8px 0 0;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.35)}
    .toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    .btn-home{display:inline-flex;align-items:center;gap:8px;color:#fff;background:#2563eb;border-radius:10px;padding:10px 14px;font-weight:600}
    .btn-home:hover{background:#1d4ed8}
    .meta{display:flex;align-items:center;gap:12px;color:#e5e7eb;background:rgba(0,0,0,.35);padding:6px 12px;border-radius:999px;font-size:12px}
    .chip{display:inline-block;padding:4px 10px;border-radius:9999px;background:linear-gradient(90deg,var(--chipFrom),var(--chipTo));color:#fff;font-size:12px;font-weight:600}
    .content{padding:24px}
    .prose{line-height:1.85}
    .prose p{margin:0 0 16px}
    .prose h2{font-size:22px;margin:24px 0 12px}
    .prose h3{font-size:18px;margin:20px 0 10px}
    .prose ul{margin:0 0 16px 20px}
    .prose li{margin:6px 0}
    .footer-meta{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e5e7eb;margin-top:20px;padding-top:16px;color:var(--muted);font-size:14px}
    @media (min-width:768px){.hero{height:420px} h1{font-size:36px}}
  </style>
  <meta name="description" content="${safeTitle}">
</head>
<body class="bg-gray-50">
  <div class="min-h-screen py-8">
    <div class="container">
      <article class="card">
        ${imageUrl ? `<header class=\"hero\"><img src=\"${imageUrl}\" alt=\"${safeTitle}\"><div class=\"overlay\"></div><div class=\"hero-content\"><div class=\"toolbar\"><span class=\"chip\">${safeCategory || 'Update'}</span><span class=\"meta\"><i class=\"fas fa-calendar-alt\"></i>${createdAt}</span></div><h1>${safeTitle}</h1></div></header>` : ''}
        <div class="content">
          <div class="toolbar" style="justify-content:flex-end;margin-bottom:8px">
            <a href="${homeUrl}" class="btn-home"><i class="fas fa-home"></i>Back to Home</a>
          </div>
          <div class="prose">
            ${descriptionHtml}
          </div>
          <div class="footer-meta">
            <span><i class="fas fa-tag" style="margin-right:6px;color:#9ca3af"></i>${safeCategory || 'General'}</span>
            <span><i class="fas fa-calendar-alt" style="margin-right:6px;color:#9ca3af"></i>${createdAt}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</body>
</html>`;
    res.status(200).send(page);
  } catch (err) {
    next(err);
  }
});

// Admin dashboard routes (serve backend/admin.html)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve frontend for all other non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message
  });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/omgva_wellness';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Using hardcoded admin credentials - no need to create default admin
    
  } catch (error) {
    console.error('❌ MongoDB connection error (continuing without DB):', error.message || error);
    console.warn('⚠️  Starting server without a database connection. Public routes and static files will work.');
  }
};

// Using hardcoded admin credentials - no need for database admin creation

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    }
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

startServer();
