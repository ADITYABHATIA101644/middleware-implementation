// server.js
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI, PORT } = require('./config/constants');

// Middleware & Routes imports
const loggingMiddleware = require('./middleware/logging');
const errorHandler = require('./middleware/asyncErrorHandler');
const authRoutes = require('./routes/auth'); // You'll need to create this
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ DB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Error Handling (last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));