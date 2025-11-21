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

## 🌐 Live Project Link
👉 https://mayur-tinylink.vercel.app/

## 📸 Project Output Screenshots

1. Dashboard Page
<img width="1470" height="956" alt="Screenshot 2025-11-21 at 6 18 43 PM" src="https://github.com/user-attachments/assets/50f56e07-9287-4a89-ab2e-9e1ad8bd8fca" />

 
2. Manage and track links
<img width="1470" height="956" alt="Screenshot 2025-11-21 at 6 18 55 PM" src="https://github.com/user-attachments/assets/7f3437b6-bf5a-4fde-82bb-8c06e5bae955" />


3. Link Stats Page
<img width="1470" height="956" alt="Screenshot 2025-11-21 at 6 19 04 PM" src="https://github.com/user-attachments/assets/bbc577ca-7055-4ee1-8479-3239579ffe30" />

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
