// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI, PORT } = require('./config/constants');

const loggingMiddleware = require('./middleware/logging');
const errorHandler = require('./middleware/asyncErrorHandler');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 
        '<span style="color: #00ff88;">Connected ✅</span>' : 
        '<span style="color: #ff3e3e;">Auth Error ❌ (Check Render Env Vars)</span>';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Experiment 2.2.1 | Aditya Bhatia</title>
            <style>
                body { background: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
                .card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 3rem; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); max-width: 600px; width: 90%; }
                h1 { color: #38bdf8; margin-bottom: 0.5rem; font-size: 2rem; }
                .status { background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #38bdf8; }
                .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
                .feature { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 0.9rem; }
                .feature b { color: #fbbf24; display: block; margin-bottom: 5px; }
                footer { margin-top: 30px; font-size: 0.8rem; color: #94a3b8; text-align: center; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Experiment 2.2.1</h1>
                <p style="color: #94a3b8;">Full-Stack Middleware Implementation</p>
                
                <div class="status">
                    <div><b>Server:</b> <span style="color: #00ff88;">Operational 🚀</span></div>
                    <div><b>Database:</b> ${dbStatus}</div>
                </div>

                <div class="feature-grid">
                    <div class="feature"><b>📝 Custom Logging</b> Intercepts every Req/Res cycle to track performance in real-time.</div>
                    <div class="feature"><b>🔐 JWT Security</b> Uses <code>auth.js</code> middleware to guard sensitive endpoints.</div>
                    <div class="feature"><b>🚀 Async Handling</b> Centralized error pipeline prevents server crashes.</div>
                    <div class="feature"><b>📦 Atlas Integration</b> Cloud-hosted MongoDB for persistent user data.</div>
                </div>

                <footer>
                    Developed by <b>Aditya Bhatia</b><br>
                    Chandigarh University | Department of CSE
                </footer>
            </div>
        </body>
        </html>
    `);
});

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));