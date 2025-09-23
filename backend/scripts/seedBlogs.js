// Seed 3 demo blogs into MongoDB for the frontend homepage section
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Blog = require('../models/Blog');

async function connectDB() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/omgva_wellness';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function bufferFromLocalImage(relPath) {
  try {
    const fs = require('fs');
    const abs = path.join(__dirname, '..', relPath);
    if (!fs.existsSync(abs)) return null;
    const data = fs.readFileSync(abs);
    const ext = path.extname(abs).toLowerCase();
    const type = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    return { data, contentType: type };
  } catch {
    return null;
  }
}

async function seed() {
  await connectDB();
  console.log('Connected. Seeding demo blogs...');

  const demos = [
    {
      title: 'Community Cleanup Drive: Making Our Neighborhood Greener',
      description: 'Our volunteers organized a successful cleanliness and plantation drive. Together we collected waste, planted saplings, and spread awareness about a cleaner environment.',
      category: 'Community',
      image_data: bufferFromLocalImage('../frontend/assets/images/activities/p3.jpeg') || undefined,
      is_published: true,
    },
    {
      title: 'Animal Rescue Camp: Care and Compassion in Action',
      description: 'A special camp to provide treatment, food, and shelter to injured and stray animals. Thanks to our amazing volunteers and supporters for making it possible.',
      category: 'Animal Care',
      image_data: bufferFromLocalImage('../frontend/assets/images/activities/an1.png') || undefined,
      is_published: true,
    },
    {
      title: 'Emergency Food Distribution: Serving Families in Need',
      description: 'During recent hardships, our team distributed food packets to families across the city ensuring no one sleeps hungry.',
      category: 'Food Distribution',
      image_data: bufferFromLocalImage('../frontend/assets/images/activities/fd4.jpeg') || undefined,
      is_published: true,
    },
  ];

  for (const demo of demos) {
    // Upsert by title to avoid duplicates
    const existing = await Blog.findOne({ title: demo.title });
    if (existing) {
      await Blog.updateOne({ _id: existing._id }, { $set: demo });
      console.log(`Updated: ${demo.title}`);
    } else {
      await Blog.create(demo);
      console.log(`Created: ${demo.title}`);
    }
  }

  console.log('Seeding complete.');
  await mongoose.connection.close();
}

seed().catch(async (err) => {
  console.error('Seed error:', err);
  try { await mongoose.connection.close(); } catch {}
  process.exit(1);
});


