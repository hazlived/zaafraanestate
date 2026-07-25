const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database connection (if MONGODB_URI is provided)
connectDB();

// Middleware (Increased payload limit to 25mb for high-res payment screenshots)
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/rituals', require('./routes/ritualRoutes'));
app.use('/api/quality', require('./routes/qualityRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Zaafraan Estate API Engine',
    time: new Date().toISOString()
  });
});

// Serve frontend build in production if client/dist exists
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.send('Zaafraan Estate API is operational. Run Vite frontend for UI.');
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`[SERVER] Zaafraan Server running on port ${PORT} (http://localhost:${PORT})`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[ERROR] Port ${PORT} is already in use by another process.`);
  } else {
    console.error('[ERROR] Server error:', err);
  }
});

// Self-Ping Heartbeat to keep Render Web Service active (prevents Render 15-minute sleep)
const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
if (RENDER_EXTERNAL_URL) {
  const https = require('https');
  setInterval(() => {
    https.get(`${RENDER_EXTERNAL_URL}/api/health`, (res) => {
      console.log(`[HEARTBEAT] Render self-ping status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error('[HEARTBEAT ERROR]', err.message);
    });
  }, 14 * 60 * 1000);
}
