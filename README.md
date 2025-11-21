# TinyLink - URL Shortener

A modern, full-stack URL shortener application built with React, Node.js, and PostgreSQL. Create short, shareable links with click tracking and analytics.

## Features

✨ **Core Features**
- **Create Short Links** - Generate short, memorable 6-8 character codes
- **Custom Codes** - Create custom short codes following the same pattern
- **Click Tracking** - Track total clicks and last click timestamp
- **Link Analytics** - View detailed statistics for each link
- **Link Management** - Delete links you no longer need
- **Search & Filter** - Quickly find links by code or URL
- **Real-time Updates** - Data updates when you return to the tab
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **node-postgres (pg)** - PostgreSQL client
- **Nanoid** - Unique ID generation

## Project Structure

```
tiny-url/
├── frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CreateLinkCard.jsx
│   │   │   ├── LinksTable.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatsPage.jsx
│   │   │   └── NotFound.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── dateFormatter.js
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   │   └── favicon.svg
│   ├── .env                 # Environment variables
│   ├── index.html           # HTML template
│   └── package.json         # Dependencies
│
└── backend/                 # Express server
    ├── src/
    │   ├── controllers/     # Business logic
    │   │   └── linksController.js
    │   ├── routes/          # API routes
    │   │   ├── links.js
    │   │   └── health.js
    │   ├── middleware/      # Custom middleware
    │   │   └── validateUrl.js
    │   ├── app.js           # Express app setup
    │   ├── db.js            # Database connection
    │   ├── server.js        # Server startup
    │   └── migrate.js       # Database migration
    ├── .env                 # Environment variables
    └── package.json         # Dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd tiny-url
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file with your database URL
# DATABASE_URL=postgresql://user:password@localhost/tinyurl
# PORT=3000
# BASE_URL=http://localhost:3000
# FRONTEND_URL=http://localhost:5174

# Run database migration
node src/migrate.js

# Start backend server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Create .env file
# VITE_API_BASE_URL=http://localhost:3000
# VITE_APP_SHORT_URL_BASE=http://localhost:3000

# Start frontend dev server
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5174
- Backend API: http://localhost:3000

## API Endpoints

### Create Short Link
```bash
POST /api/links
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/url",
  "code": "optional-custom-code"
}

Response:
{
  "code": "abc123def",
  "long_url": "https://example.com/very/long/url"
}
```

### Get All Links
```bash
GET /api/links

Response:
[
  {
    "code": "abc123def",
    "long_url": "https://example.com/url",
    "clicks": 5,
    "created_at": "2025-11-21 14:30:00",
    "last_clicked": "2025-11-21 14:45:30"
  }
]
```

### Get Link Statistics
```bash
GET /api/links/:code

Response:
{
  "code": "abc123def",
  "long_url": "https://example.com/url",
  "clicks": 5,
  "created_at": "2025-11-21 14:30:00",
  "last_clicked": "2025-11-21 14:45:30"
}
```

### Delete Link
```bash
DELETE /api/links/:code

Response: 204 No Content
```

### Redirect to Original URL
```bash
GET /:code
Response: 302 Redirect to original URL
```

### Health Check
```bash
GET /healthz

Response:
{
  "ok": true,
  "version": "1.0"
}
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host/database
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5174
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_SHORT_URL_BASE=http://localhost:3000
```

## Key Features Explained

### Smart Data Refresh
- Dashboard automatically fetches updated link data when you return to the browser tab
- No unnecessary polling - saves server resources and battery life

### IST Timezone Support
- All timestamps are automatically converted to India Standard Time (IST)
- Backend converts UTC timestamps at the PostgreSQL query level
- Frontend displays in readable format: "21 November 2025 at 02:53:20 pm"

### URL Validation
- URLs must start with `https://` or `http://`
- Invalid URLs are rejected with clear error messages
- Prevents malformed or unsafe links

### Custom Code Validation
- Custom codes must be 6-8 alphanumeric characters
- Same pattern as auto-generated codes
- Ensures consistent URL structure

### 404 Handling
- Styled 404 page when accessing deleted or invalid links
- Users can easily navigate back to dashboard
- Works from both backend and frontend routes

## Deployment

### 🚀 Deploy to Vercel (Full Stack)

Vercel is the easiest way to deploy both frontend and backend together.

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Authorize Vercel to access your repositories

3. **Deploy Project**
   - Click "Add New Project"
   - Select the TinyLink repository
   - Configure project settings:
     - **Build Command**: `cd frontend && npm run build`
     - **Output Directory**: `frontend/dist`
     - **Install Command**: `npm install --legacy-peer-deps`

4. **Set Environment Variables**
   In Vercel project settings, add:
   ```
   DATABASE_URL = your_postgresql_url
   FRONTEND_URL = your_vercel_domain
   VITE_API_BASE_URL = your_api_url
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is now live!

### Alternative: Deploy Backend on Render

If you prefer to host backend separately:

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create New Web Service
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Root Directory**: `backend`
6. Add environment variables
7. Deploy

### Alternative: Deploy Frontend on Vercel Only

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import `frontend` directory only
4. Set `VITE_API_BASE_URL` to your backend URL
5. Deploy

## Database Schema

### links table
```sql
CREATE TABLE links (
  code VARCHAR(8) PRIMARY KEY,
  long_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_clicked TIMESTAMP
);
```

## Performance Considerations

- IST conversion happens at database level for consistency
- Event-based data refresh instead of polling
- Optimized database queries with proper indexing
- CSS-in-JS with Tailwind for minimal bundle size
- Efficient component re-renders with React hooks

## Security

- URL validation prevents XSS attacks
- CORS enabled for secure cross-origin requests
- PostgreSQL parameterized queries prevent SQL injection
- Environment variables keep sensitive data secure

## Future Enhancements

- 🔐 User authentication and link ownership
- 📊 Advanced analytics dashboard
- 🔗 QR code generation
- 📅 Link expiration dates
- 📤 Batch URL import/export
- 🎨 Custom branding for links
- 📧 Email notifications for link activity

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and PostgreSQL**
