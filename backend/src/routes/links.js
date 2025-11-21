const express = require('express');
const router = express.Router();
const { createLink, getLinks, getLink, deleteLink } = require('../controllers/linksController');
const validateUrl = require('../middleware/validateUrl');

router.post('/', validateUrl, createLink);
router.get('/', getLinks);
router.get('/:code', getLink);
router.delete('/:code', deleteLink);

module.exports = router;