const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [50000, 'Description cannot exceed 50000 characters']
  },
  image_data: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [100, 'Category cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  is_published: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
blogSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Create unique slug from title
blogSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    
    // Ensure slug is unique
    let slug = baseSlug;
    let counter = 1;
    
    while (true) {
      const existingBlog = await this.constructor.findOne({ slug: slug, _id: { $ne: this._id } });
      if (!existingBlog) {
        break;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

// Index for better query performance
blogSchema.index({ category: 1, is_published: 1 });
blogSchema.index({ created_at: -1 });

module.exports = mongoose.model('Blog', blogSchema);
