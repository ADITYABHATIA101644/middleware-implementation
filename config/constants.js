// config/constants.js
require('dotenv').config();

module.exports = {
    // This will look for the MONGO_URI you set in Render or your .env file
    MONGO_URI: process.env.MONGO_URI,
    
    // This will look for your JWT_SECRET
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_for_local_testing',
    
    // Render provides the PORT automatically
    PORT: process.env.PORT || 3000
};