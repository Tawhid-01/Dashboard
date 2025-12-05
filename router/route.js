const express = require('express');
const { home } = require('../controllers/dashController');
const router = express.Router();

// Example route
router.get("/", home)

module.exports = router;