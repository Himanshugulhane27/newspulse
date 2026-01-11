# NewsPulse Setup Guide

## Prerequisites

Before setting up NewsPulse, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download here](https://git-scm.com/)

## API Key Setup

1. **Get NewsAPI Key**:
   - Visit [NewsAPI.org](https://newsapi.org/)
   - Sign up for a free account
   - Get your API key from the dashboard

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd NEWS_AGGREGATOR

# Install root dependencies and setup all packages
npm run setup
```

### 2. Environment Configuration

#### Backend Environment (.env)
```bash
# Copy the example file
cp backend/.env.example backend/.env

# Edit the .env file with your values
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newspulse
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEWS_API_KEY=your-newsapi-key-from-newsapi.org
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Environment (.env)
```bash
# Copy the example file
cp frontend/.env.example frontend/.env

# Edit the .env file
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
# On macOS with Homebrew:
brew services start mongodb-community

# On Ubuntu:
sudo systemctl start mongod

# On Windows:
# Start MongoDB from Services or run mongod.exe
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in backend/.env

### 4. Start Development Servers

```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run frontend
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Production Deployment

### 1. Build the Application

```bash
# Build frontend for production
npm run build
```

### 2. Environment Variables for Production

Update your production environment variables:

```bash
# Backend Production .env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-very-secure-jwt-secret-for-production
NEWS_API_KEY=your-newsapi-key
CORS_ORIGIN=https://your-domain.com
```

### 3. Deployment Options

#### Option A: Traditional Server (PM2)
```bash
# Install PM2 globally
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start src/server.js --name "newspulse-api"

# Serve frontend with nginx or serve
npm install -g serve
cd ../frontend
serve -s dist -l 3000
```

#### Option B: Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

#### Option C: Cloud Platforms

**Vercel (Frontend)**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Railway/Render (Backend)**:
- Connect your GitHub repository
- Set environment variables in dashboard
- Deploy automatically

### 4. Nginx Configuration (Optional)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **MongoDB connection failed**:
   - Check if MongoDB is running
   - Verify connection string in .env
   - Check firewall settings

3. **NewsAPI rate limit**:
   - Free tier has 1000 requests/day
   - Upgrade to paid plan for more requests
   - Implement caching for production

4. **CORS errors**:
   - Verify CORS_ORIGIN in backend .env
   - Check if frontend URL matches

### Performance Optimization

1. **Enable caching**:
   ```javascript
   // Add to backend/src/server.js
   const cache = require('memory-cache');
   
   // Cache news for 5 minutes
   app.use('/api/news', (req, res, next) => {
     const key = req.originalUrl;
     const cached = cache.get(key);
     if (cached) {
       return res.json(cached);
     }
     next();
   });
   ```

2. **Image optimization**:
   - Use CDN for images
   - Implement lazy loading
   - Add image compression

3. **Database indexing**:
   ```javascript
   // Add indexes for better performance
   db.bookmarks.createIndex({ userId: 1, "article.url": 1 });
   db.users.createIndex({ email: 1 });
   ```

## Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Keep dependencies updated

## Monitoring

### Health Checks
- Backend: `GET /api/health`
- Database: Monitor MongoDB connections
- Frontend: Check build status

### Logging
```javascript
// Add to backend for better logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Support

For issues and questions:
1. Check this documentation
2. Review error logs
3. Check GitHub issues
4. Contact support team

## License

MIT License - see LICENSE file for details.