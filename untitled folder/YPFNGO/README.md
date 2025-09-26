# Yuva Prerna Foundation – Website & Blog API

A full-stack project for Yuva Prerna Foundation featuring a static frontend and a Node.js/Express backend with MongoDB for blog management.

## Tech Stack

- Frontend: HTML, CSS (Tailwind CDN for dev), vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Auth: JWT (admin-only, hardcoded credentials in dev)
- File Uploads: Multer (memory storage) – images stored in MongoDB as binary
- Security: Helmet, CORS, Rate limiting, express-validator
- Optional AI: OpenAI (content generation, with safe fallback)

## Repository Structure

```
NgoShivam/
  frontend/
    index.html
    assets/
      css/
        styles.css
      js/
        script.js
      images/
        achievements/
        activities/
        certificates/
        general/
        newspaper/
  backend/
    server.js
    package.json
    routes/
      auth.js
      blogs.js
    middleware/
      auth.js
      upload.js
    models/
      Admin.js
      Blog.js
    scripts/
      seedBlogs.js
    admin.html
    render.yaml
    deploy.sh
  .git/
  README.md
```

## Features

- Public website with sections (Hero, Activities, Gallery, Contact)
- Latest News & Updates section that fetches blogs from backend API
- Admin dashboard (simple HTML) for posting blogs (protected by JWT)
- Images served from DB via `/api/blogs/image/:id`
- Blog detail pages rendered by backend at `/blog/:slug` (responsive)

## Environment Variables

Create a `.env` file in `backend/` (copy from `env.example` if present):

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/omgva_wellness
JWT_SECRET=your_strong_secret
# Optional
OPENAI_API_KEY=sk-...
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
MAX_FILE_SIZE=5242880
FRONTEND_URL=http://127.0.0.1:5500/frontend/index.html
```

## Local Development

1) Start the backend

```
cd backend
npm install
npm run dev   # or: npm start
```

- Health check: `http://localhost:3000/api/health`
- API base: `http://localhost:3000/api`

2) Serve the frontend (static)

```
cd ../frontend
npm install
npm run dev     # serves at http://127.0.0.1:5500
```

The frontend script auto-detects the environment:
- If served on port 5500 → it calls the backend at `http://localhost:3000/api`.
- If served by the backend (same origin) → it calls `/api`.

3) Seed demo blogs (optional)

```
cd ../backend
npm run seed
```

## Admin Access

- Dashboard: `http://localhost:3000/admin`
- Default credentials (dev only):
  - username: `omgvawellness`
  - password: `omgva.in`

## API Overview

- GET `/api/blogs?limit=&page=` – list published blogs
- GET `/api/blogs/:slug` – get a single blog (published)
- GET `/api/blogs/image/:id` – serve blog image by id
- GET `/api/blogs/admin/all` – list all blogs (auth)
- POST `/api/blogs` – create blog (auth, multipart field: `image`)
- PUT `/api/blogs/:id` – update blog (auth, optional `image`)
- DELETE `/api/blogs/:id` – delete blog (auth)
- POST `/api/auth/login` – admin login (returns JWT)
- GET `/api/health` – health check

Blog detail SSR route:
- GET `/blog/:slug` – server-rendered blog page with hero + content

## Deployment Notes

- The backend can serve the frontend statically for production:
  - `backend/server.js` uses `express.static('../frontend')` when appropriate.
- Configure `CORS` origins and `FRONTEND_URL` to your deployed domain.
- `render.yaml` and `deploy.sh` are included as deployment helpers; review and adapt.

## Scripts (backend)

- `npm run dev` – start backend with nodemon
- `npm start` – start backend
- `npm run seed` – seed three demo blogs

## Images & Uploads

- Upload field name: `image`
- Stored in MongoDB as `image_data` (buffer + contentType)
- Public serving via `/api/blogs/image/:id`

## Security

- Helmet CSP configured; in production, consider removing dev-only CDNs or integrating a local CSS build.
- Rate limiter on `/api/` routes
- Auth via signed JWT (set `JWT_SECRET`)

## License

MIT
