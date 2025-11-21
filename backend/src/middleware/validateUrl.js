const validateUrl = (req, res, next) => {
  try {
    let url = req.body.longUrl;
    // Reject URLs that don't start with http:// or https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return res.status(400).json({ error: 'URL must start with https:// or http://' });
    }
    // Validate the URL
    new URL(url);
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
};

module.exports = validateUrl;