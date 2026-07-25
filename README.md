# Zaafraan Estate — Full-Stack MERN Saffron Store

An ultra-luxurious, production-ready MERN (MongoDB, Express, React, Node.js) web application for **Zaafraan Estate**, purveyors of authentic GI Tagged Kashmiri Mongra Saffron from Pampore Karewas.

## Tech Stack Architecture
- **Backend**: Node.js, Express.js REST API, Mongoose-ready schemas, CORS.
- **Frontend**: React 18, Vite, React Router v6, Context API for Cart Management, Vanilla CSS design system, SVG Icon Symbols.
- **Database**: Future-ready Mongoose configuration (`server/config/db.js` and `server/models/`). Currently runs with zero-config in-memory mock datasets until a MongoDB URI is connected.

---

## Quick Start Guide

### 1. Install All Dependencies
Run from the root directory:
```bash
npm run install:all
```

### 2. Run in Development Mode
Launch both Node backend (`http://localhost:5000`) and Vite React frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

---

## Future MongoDB Database Activation
To connect to a live MongoDB database:
1. Open `server/.env` (or set environment variable `MONGODB_URI`).
2. Add your connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/zaafraan
   ```
3. Enable database connection in `server/server.js` by calling `connectDB()`.

---

## Directory Structure
```
saffron/
├── package.json               # Root launcher scripts
├── server/                    # Node.js + Express API Backend
│   ├── server.js              # Express app entrypoint
│   ├── config/db.js           # Mongoose connection manager
│   ├── models/                # Product, Ritual, Contact Mongoose schemas
│   ├── data/                  # Mock seeds for items, recipes, lab results
│   ├── controllers/           # API request handlers
│   └── routes/                # Express router endpoints
└── client/                    # React + Vite Frontend
    ├── vite.config.js         # API proxy config (/api -> localhost:5000)
    ├── src/
    │   ├── context/           # Shopping Cart Context state manager
    │   ├── services/api.js    # API service client
    │   ├── components/        # Header, Footer, CartDrawer, ProductCard, Calculators
    │   ├── pages/             # Home, Story, Shop, Rituals, Quality, Contact
    │   └── styles/            # Modern luxury design system
```
