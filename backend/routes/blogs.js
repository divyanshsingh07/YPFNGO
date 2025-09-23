const express = require('express');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const path = require('path');
const axios = require('axios');
const OpenAI = require('openai');

const router = express.Router();

// Initialize OpenAI (only if key is present)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Validation rules for blog creation
const blogValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 100000 })
      .withMessage('Description must be between 1 and 100000 characters'),
  body('category')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category is required and must be at most 100 characters')
];

// Validation rules for blog updates (more flexible)
const blogUpdateValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100000 })
      .withMessage('Description must be between 1 and 100000 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be at most 100 characters')
];

// GET /blogs - Fetch all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = { is_published: true };
    if (category) {
      query.category = category;
    }
    
    const blogs = await Blog.find(query)
      .select('title description image_data category slug created_at')
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Add image URL to each blog
    const blogsWithImageUrl = blogs.map(blog => ({
      ...blog.toObject(),
      image_url: blog.image_data ? `/api/blogs/image/${blog._id}` : null
    }));
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      data: blogsWithImageUrl,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total: total
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

// GET /blogs/:slug - Fetch single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      is_published: true 
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Add image URL to the blog
    const blogWithImageUrl = {
      ...blog.toObject(),
      image_url: blog.image_data ? `/api/blogs/image/${blog._id}` : null
    };
    
    res.json({
      success: true,
      data: blogWithImageUrl
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog'
    });
  }
});

// GET /blogs/image/:id - Serve image from database
router.get('/image/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog || !blog.image_data || !blog.image_data.data) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    res.set('Content-Type', blog.image_data.contentType);
    res.send(blog.image_data.data);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving image'
    });
  }
});

// POST /blogs - Create new blog (admin only)
router.post('/', auth, upload, blogValidation, handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }
    
    const { title, description, category } = req.body;
    
    const blog = new Blog({
      title,
      description,
      image_data: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      category: category
    });
    
    await blog.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    // No file cleanup needed since we're using memory storage
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this title already exists. Please choose a different title.'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating blog'
    });
  }
});

// PUT /blogs/:id - Update blog (admin only)
router.put('/:id', auth, upload, blogUpdateValidation, handleUploadError, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    const { title, description, category } = req.body;
    const updateData = {};
    
    // Only update fields that are provided
    if (title && title.trim()) {
      updateData.title = title.trim();
    }
    if (description && description.trim()) {
      updateData.description = description.trim();
    }
    if (category && category.trim()) {
      updateData.category = category.trim();
    }
    
    // Handle image update
    if (req.file) {
      updateData.image_data = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    
    // Check if there's anything to update
    if (Object.keys(updateData).length === 0 && !req.file) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided for update'
      });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this title already exists. Please choose a different title.'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating blog'
    });
  }
});

// DELETE /blogs/:id - Delete blog (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Image data will be automatically deleted with the blog document
    
    await Blog.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog'
    });
  }
});

// GET /blogs/admin/all - Get all blogs for admin (including unpublished)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const blogs = await Blog.find()
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Blog.countDocuments();
    
    // Add image URL to each blog
    const blogsWithImageUrl = blogs.map(blog => ({
      ...blog.toObject(),
      image_url: blog.image_data ? `/api/blogs/image/${blog._id}` : null
    }));
    
    // Debug: Log the first blog to see its structure
    if (blogsWithImageUrl.length > 0) {
      console.log('Admin route - First blog:', blogsWithImageUrl[0]);
      console.log('Admin route - Blog description:', blogsWithImageUrl[0].description);
    }
    
    res.json({
      success: true,
      data: blogsWithImageUrl,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total: total
      }
    });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

// POST /blogs/generate - Generate blog content using AI (admin only)
router.post('/generate', auth, async (req, res) => {
  try {
    const { title, category, description } = req.body;

    // Validate required fields
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and description are required for blog generation'
      });
    }

    // Validate category
    // category now free-form; basic length check handled by validators

    // Create the AI prompt
    const aiPrompt = `You are an expert blog writer for a wellness website.  
Your task is to generate a complete, SEO-friendly blog article based on the following inputs:  

Title: ${title}  
Category: ${category}  
Description: ${description}  

### Requirements:
- Write at least 800–1000 words.  
- Use an engaging and professional tone (educational + motivational).  
- Include an introduction, 3–5 main sections with H2/H3 headings, and a conclusion.  
- Optimize for SEO: include keywords naturally related to the title and category.  
- Make the content unique, original, and plagiarism-free.  
- Write in simple, clear English so it's easy for a wide audience to understand.  
- Suggest 3–5 tags/keywords for SEO at the end.  

Return the output in **structured JSON format** like this:

{
  "title": "Generated Blog Title",
  "category": "${category}",
  "description": "${description}",
  "content": "Full blog content here...",
  "tags": ["keyword1", "keyword2", "keyword3"]
}`;

    // Generate blog content using OpenAI API
    const generatedBlog = await generateBlogContentWithOpenAI(title, category, description);

    res.json({
      success: true,
      message: 'Blog content generated successfully',
      data: generatedBlog
    });

  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating blog content'
    });
  }
});

// Function to generate blog content using OpenAI API
async function generateBlogContentWithOpenAI(title, category, description) {
  try {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    const prompt = `You are an expert blog writer for a wellness website called "Omgva Wellness". 
Your task is to generate a complete, SEO-friendly blog article based on the following inputs:

Title: ${title}
Category: ${category}
Description: ${description}

### Requirements:
- Write at least 800–1000 words
- Use an engaging and professional tone (educational + motivational)
- Include an introduction, 3–5 main sections with H2/H3 headings, and a conclusion
- Optimize for SEO: include keywords naturally related to the title and category
- Make the content unique, original, and plagiarism-free
- Write in simple, clear English so it's easy for a wide audience to understand
- Focus on wellness, health, and holistic healing practices
- Include practical tips and actionable advice
- End with a call-to-action encouraging readers to contact Omgva Wellness

### Category-specific focus:
- AYURVEDA: Focus on ancient healing, doshas, natural remedies, lifestyle practices
- NATUROPATHY: Focus on natural healing, herbal medicine, preventive care
- YOGA: Focus on physical postures, breathing, mindfulness, stress relief
- MEDITATION: Focus on mindfulness, inner peace, mental clarity, stress reduction
- WELLNESS CUISINES: Focus on healthy eating, nutrition, healing foods
- PANCHKARMA: Focus on detoxification, cleansing, rejuvenation

Return the output in **structured JSON format** like this:

{
  "title": "${title}",
  "category": "${category}",
  "description": "${description}",
  "content": "Full blog content here with proper HTML formatting (use <h2>, <h3>, <p>, <strong>, <em>, <ul>, <li> tags)...",
  "tags": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

IMPORTANT: Use HTML tags instead of markdown. Use <h2> for main headings, <h3> for subheadings, <p> for paragraphs, <strong> for bold text, <em> for italic text, <ul> and <li> for lists.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert wellness content writer specializing in holistic health, Ayurveda, yoga, meditation, and natural healing practices. You write engaging, SEO-optimized blog posts that educate and inspire readers to improve their health and wellness."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    const generatedData = JSON.parse(response);
    
    return {
      title: generatedData.title || title,
      category: generatedData.category || category.toUpperCase(),
      description: generatedData.description || description,
      content: generatedData.content || response,
      tags: generatedData.tags || ['wellness', 'health', 'holistic', 'healing', 'natural']
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback to template-based generation if OpenAI fails
    return generateBlogContentFallback(title, category, description);
  }
}

// Fallback function for when OpenAI API is not available
function generateBlogContentFallback(title, category, description) {
  const categoryInfo = {
    'AYURVEDA': {
      keywords: ['ayurveda', 'ancient healing', 'natural remedies', 'holistic health', 'dosha'],
      benefits: ['natural healing', 'body balance', 'mind-body connection', 'preventive care'],
      practices: ['herbal medicine', 'dietary guidelines', 'lifestyle practices', 'meditation']
    },
    'NATUROPATHY': {
      keywords: ['naturopathy', 'natural healing', 'herbal medicine', 'holistic wellness', 'preventive care'],
      benefits: ['natural treatment', 'immune support', 'detoxification', 'vitality'],
      practices: ['nutrition therapy', 'herbal remedies', 'lifestyle counseling', 'physical therapy']
    },
    'YOGA': {
      keywords: ['yoga', 'mindfulness', 'flexibility', 'stress relief', 'meditation'],
      benefits: ['physical strength', 'mental clarity', 'stress reduction', 'flexibility'],
      practices: ['asanas', 'pranayama', 'meditation', 'mindfulness']
    },
    'MEDITATION': {
      keywords: ['meditation', 'mindfulness', 'inner peace', 'stress relief', 'mental clarity'],
      benefits: ['stress reduction', 'mental clarity', 'emotional balance', 'focus'],
      practices: ['mindfulness meditation', 'breathing exercises', 'guided meditation', 'silent sitting']
    },
    'WELLNESS CUISINES': {
      keywords: ['wellness food', 'healthy eating', 'nutrition', 'healing foods', 'balanced diet'],
      benefits: ['nutrient density', 'immune support', 'energy boost', 'digestive health'],
      practices: ['organic foods', 'plant-based nutrition', 'superfoods', 'meal planning']
    },
    'PANCHKARMA': {
      keywords: ['panchkarma', 'detoxification', 'ayurvedic cleansing', 'rejuvenation', 'purification'],
      benefits: ['body detox', 'rejuvenation', 'digestive health', 'mental clarity'],
      practices: ['vamana', 'virechana', 'basti', 'nasya', 'raktamokshana']
    }
  };

  const info = categoryInfo[category.toUpperCase()] || categoryInfo['AYURVEDA'];
  
  const content = `<h1>${title}</h1>

<h2>Introduction</h2>

<p>Welcome to the world of ${category.toLowerCase()}, where ancient wisdom meets modern wellness. ${description} In today's fast-paced world, finding balance and harmony in our lives has become more important than ever. This comprehensive guide will explore the transformative power of ${category.toLowerCase()} and how it can enhance your overall well-being.</p>

<h2>Understanding ${category}</h2>

<p>${category} is more than just a practice—it's a way of life that has been refined over centuries. This ancient wisdom offers a holistic approach to health and wellness, addressing not just physical symptoms but the root causes of imbalance in our lives.</p>

<h3>The Core Principles</h3>

<p>The foundation of ${category.toLowerCase()} rests on several key principles:</p>

<ul>
<li><strong>Holistic Approach</strong>: Treating the whole person, not just symptoms</li>
<li><strong>Natural Healing</strong>: Working with the body's innate healing abilities</li>
<li><strong>Prevention</strong>: Focusing on maintaining health rather than just treating illness</li>
<li><strong>Balance</strong>: Creating harmony between mind, body, and spirit</li>
</ul>

<h2>The Benefits of ${category}</h2>

<h3>Physical Benefits</h3>

<p>Regular practice of ${category.toLowerCase()} offers numerous physical benefits:</p>

<ul>
<li><strong>Enhanced Vitality</strong>: Boost your energy levels naturally</li>
<li><strong>Improved Immunity</strong>: Strengthen your body's defense mechanisms</li>
<li><strong>Better Digestion</strong>: Support optimal digestive function</li>
<li><strong>Increased Flexibility</strong>: Improve your range of motion and physical comfort</li>
</ul>

<h3>Mental and Emotional Benefits</h3>

<p>The mental and emotional benefits are equally profound:</p>

<ul>
<li><strong>Stress Reduction</strong>: Learn to manage daily stress effectively</li>
<li><strong>Mental Clarity</strong>: Enhance focus and cognitive function</li>
<li><strong>Emotional Balance</strong>: Develop greater emotional resilience</li>
<li><strong>Inner Peace</strong>: Cultivate a sense of calm and contentment</li>
</ul>

<h2>Practical Applications</h2>

<h3>Getting Started</h3>

<p>Beginning your journey with ${category.toLowerCase()} is easier than you might think:</p>

<ol>
<li><strong>Start Small</strong>: Begin with simple practices that fit your lifestyle</li>
<li><strong>Be Consistent</strong>: Regular practice yields the best results</li>
<li><strong>Listen to Your Body</strong>: Pay attention to how your body responds</li>
<li><strong>Seek Guidance</strong>: Consider working with a qualified practitioner</li>
</ol>

<h3>Daily Practices</h3>

<p>Incorporating ${category.toLowerCase()} into your daily routine can be simple and rewarding:</p>

<ul>
<li><strong>Morning Routine</strong>: Start your day with mindful practices</li>
<li><strong>Breathing Exercises</strong>: Use breathwork to center yourself</li>
<li><strong>Mindful Eating</strong>: Pay attention to what and how you eat</li>
<li><strong>Evening Reflection</strong>: End your day with gratitude and reflection</li>
</ul>

<h2>Advanced Techniques</h2>

<h3>Deepening Your Practice</h3>

<p>As you become more comfortable with basic practices, you can explore advanced techniques:</p>

<ul>
<li><strong>Specialized Methods</strong>: Learn techniques specific to your needs</li>
<li><strong>Seasonal Practices</strong>: Adapt your routine to different seasons</li>
<li><strong>Individualized Approach</strong>: Customize practices for your unique constitution</li>
<li><strong>Integration</strong>: Combine multiple practices for comprehensive wellness</li>
</ul>

<h2>Common Challenges and Solutions</h2>

<h3>Overcoming Obstacles</h3>

<p>It's natural to face challenges in your wellness journey:</p>

<ul>
<li><strong>Time Constraints</strong>: Find creative ways to fit practices into your schedule</li>
<li><strong>Motivation</strong>: Connect with your deeper purpose for wellness</li>
<li><strong>Consistency</strong>: Build habits gradually and be patient with yourself</li>
<li><strong>Expectations</strong>: Focus on progress rather than perfection</li>
</ul>

<h2>Conclusion</h2>

<p>${category} offers a timeless path to wellness that can transform your life in profound ways. By embracing these ancient practices with modern understanding, you can create a foundation of health and happiness that supports you in all aspects of life.</p>

<p>Remember, the journey to wellness is personal and unique. What matters most is taking the first step and remaining committed to your growth. Whether you're just beginning or deepening an existing practice, ${category.toLowerCase()} has something valuable to offer.</p>

<p>Start your journey today and discover the transformative power of ${category.toLowerCase()} in your own life. Your body, mind, and spirit will thank you for the investment in your well-being.</p>

<hr>

<p><em>Ready to begin your wellness journey? Contact Omgva Wellness to learn more about our ${category.toLowerCase()} programs and how they can support your health and happiness.</em></p>`;

  return {
    title: title,
    category: category.toUpperCase(),
    description: description,
    content: content,
    tags: info.keywords.slice(0, 5)
  };
}

// Debug route to check blog data
router.get('/debug/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: blog._id,
        title: blog.title,
        description: blog.description,
        descriptionLength: blog.description ? blog.description.length : 0,
        category: blog.category,
        image_url: blog.image_data ? `/api/blogs/image/${blog._id}` : null,
        created_at: blog.created_at
      }
    });
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog data'
    });
  }
});

module.exports = router;
