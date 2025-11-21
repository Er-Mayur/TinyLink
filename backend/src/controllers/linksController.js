const pool = require('../db');
const { nanoid } = require('nanoid');

// Helper function to add IST offset (5 hours 30 minutes) to UTC date
const addISTOffset = (dateString) => {
  if (!dateString) return null;
  
  // dateString comes from DB as ISO string like "2025-11-21T09:30:14.188Z"
  const date = new Date(dateString);
  // Add 5.5 hours to convert UTC to IST
  const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
  
  // Now format using regular getters (these work with the adjusted time)
  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, '0');
  const day = String(istDate.getDate()).padStart(2, '0');
  const hours = String(istDate.getHours()).padStart(2, '0');
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const seconds = String(istDate.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Helper to convert all timestamps in a row to IST
const formatRowIST = (row) => {
  if (!row) return row;
  
  const formatted = { ...row };
  if (formatted.created_at) {
    formatted.created_at = addISTOffset(formatted.created_at);
  }
  if (formatted.last_clicked) {
    formatted.last_clicked = addISTOffset(formatted.last_clicked);
  }
  
  return formatted;
};

const createLink = async (req, res) => {
  const { longUrl, code } = req.body;
  let linkCode = code || nanoid(8);
  try {
    // Check if code exists
    const existing = await pool.query('SELECT * FROM links WHERE code = $1', [linkCode]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Code already exists' });
    }
    // Insert
    await pool.query('INSERT INTO links (code, long_url) VALUES ($1, $2)', [linkCode, longUrl]);
    res.status(201).json({ code: linkCode, long_url: longUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        code, 
        long_url, 
        clicks, 
        created_at,
        last_clicked
      FROM links 
      ORDER BY created_at DESC
    `);
    // Convert all timestamps to IST
    const rows = result.rows.map(formatRowIST);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLink = async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        code, 
        long_url, 
        clicks, 
        created_at,
        last_clicked
      FROM links 
      WHERE code = $1
    `, [code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }
    // Convert timestamps to IST
    const row = formatRowIST(result.rows[0]);
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLink = async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query('DELETE FROM links WHERE code = $1 RETURNING *', [code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const redirect = async (req, res) => {
  const { code } = req.params;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';
  
  try {
    const result = await pool.query('SELECT * FROM links WHERE code = $1', [code]);
    if (result.rows.length === 0) {
      // Render a 404 HTML page with proper content type
      res.status(404);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>404 - Page Not Found</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4">
            <div class="text-center max-w-md">
              <h1 class="text-8xl md:text-9xl font-black text-slate-900 mb-2 leading-none">404</h1>
              <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Page Not Found</h2>
              <p class="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                The link you are looking for doesn't exist or has been deleted.
              </p>
              <a href="${frontendUrl}" class="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg no-underline">
                Go Back Home
              </a>
            </div>
          </div>
        </body>
        </html>
      `);
    }
    // Increment clicks
    await pool.query('UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1', [code]);
    res.redirect(302, result.rows[0].long_url);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createLink, getLinks, getLink, deleteLink, redirect };