// routes/protected.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/data', protect, (req, res) => {
    res.json({ message: 'This is sensitive data accessible only with a token!', user: req.user });
});

module.exports = router;