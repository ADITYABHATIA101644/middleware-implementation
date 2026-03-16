const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Ensure this filename is 'auth.js'

// This route is protected. It will only run if the 'protect' middleware calls next()
router.get('/data', protect, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route!",
        data: "This information is only visible with a valid JWT token.",
        user: req.user // Information extracted from the token
    });
});

module.exports = router;