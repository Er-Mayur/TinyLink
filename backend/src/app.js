const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const linksRouter = require('./routes/links');
const healthRouter = require('./routes/health');
const pool = require('./db');

app.use('/api/links', linksRouter);
app.use('/healthz', healthRouter);

// Redirect route
const { redirect } = require('./controllers/linksController');
app.get('/:code', redirect);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;