// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI, PORT } = require('./config/constants');

// Import Middleware
const loggingMiddleware = require('./middleware/logging');
const errorHandler = require('./middleware/asyncErrorHandler');

// Import Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

// 1. Global Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON
app.use(loggingMiddleware); // Logs every request to the console

// 2. Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 3. Simple Home Route (Smoke Test)
// This runs automatically when you open your Render URL in a browser
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected ✅" : "Connecting... ⏳";
    res.send(`
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
            <h1 style="color: #2c3e50;">Experiment 2.2.1: Middleware Implementation</h1>
            <p><strong>Server Status:</strong> Online 🚀</p>
            <p><strong>Database Status:</strong> ${dbStatus}</p>
            <hr>
            <h3>Project Details:</h3>
            <ul>
                <li><strong>Logging:</strong> Active (Check Render Logs)</li>
                <li><strong>Auth:</strong> JWT Protection enabled on /api/protected</li>
                <li><strong>Environment:</strong> Render Cloud</li>
            </ul>
            <p style="color: #7f8c8d;">Developed by Anna Bhatnagar - Chandigarh University</p>
        </div>
    `);
});

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// 5. Error Handling Middleware (Must be defined last)
app.use(errorHandler);

// 6. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});