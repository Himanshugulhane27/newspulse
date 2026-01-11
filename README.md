# NewsPulse - Real-Time News Aggregator Platform

A modern, full-stack news aggregation platform built with React, Node.js, and MongoDB.

## Features

- Real-time news fetching from NewsAPI
- Category filtering (Technology, Business, Sports, Health, Entertainment, World)
- Keyword search functionality
- User authentication with JWT
- Bookmark/save articles
- User dashboard
- Dark mode support
- Responsive design
- Infinite scroll pagination

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT
- **News API**: NewsAPI.org

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- NewsAPI.org API key

### Installation

1. Clone and setup:
```bash
cd NEWS_AGGREGATOR
npm run setup
```

2. Configure environment variables:
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Add your NewsAPI key and MongoDB URI

# Frontend (.env)
cp frontend/.env.example frontend/.env
```

3. Start development servers:
```bash
npm run dev
```

### Production Deployment

```bash
npm run build
npm run start
```

## Project Structure

```
NEWS_AGGREGATOR/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express API
├── package.json       # Root package.json for scripts
└── README.md
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/news` - Fetch news with filters
- `GET /api/news/search` - Search news
- `POST /api/bookmarks` - Save article
- `GET /api/bookmarks` - Get user bookmarks
- `DELETE /api/bookmarks/:id` - Remove bookmark

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newspulse
JWT_SECRET=your-jwt-secret
NEWS_API_KEY=your-newsapi-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```# newspulse
