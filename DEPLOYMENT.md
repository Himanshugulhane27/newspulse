# NewsPulse Deployment Guide

## 🚀 Deploy to Production

### Prerequisites
- GitHub account
- Vercel account
- Render account  
- MongoDB Atlas account

## 1. Setup MongoDB Atlas

### Create Database:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0) for now
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/newspulse?retryWrites=true&w=majority
   ```

## 2. Deploy Backend to Render

### Steps:
1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new **Web Service**
4. Connect GitHub repo
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Environment Variables in Render:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newspulse?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-min-32-characters-long
NEWS_API_KEY=86ffdfd15a784fa3be496a412cff8c4b
FRONTEND_URL=https://your-app-name.vercel.app
CORS_ORIGIN=https://your-app-name.vercel.app
```

### Your Backend URL will be:
```
https://your-backend-name.onrender.com
```

## 3. Deploy Frontend to Vercel

### Steps:
1. Go to [Vercel](https://vercel.com)
2. Import GitHub repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Environment Variables in Vercel:
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

### Your Frontend URL will be:
```
https://your-app-name.vercel.app
```

## 4. Update CORS After Deployment

After getting your Vercel URL, update Render environment variables:
```
FRONTEND_URL=https://your-actual-vercel-url.vercel.app
CORS_ORIGIN=https://your-actual-vercel-url.vercel.app
```

## 5. Test Deployment

### Backend Health Check:
```
https://your-backend-name.onrender.com/api/health
```

### Frontend:
```
https://your-app-name.vercel.app
```

## 6. Final URLs Format

- **Frontend**: `https://newspulse-frontend.vercel.app`
- **Backend**: `https://newspulse-backend.onrender.com`
- **API Base**: `https://newspulse-backend.onrender.com/api`

## Files Changed for Deployment

### Backend:
- `src/server.js` - Updated CORS and added root endpoint
- `.env.production` - Production environment template
- `render.yaml` - Render deployment config

### Frontend:
- `src/services/api.js` - Improved API URL handling
- `.env.production` - Production environment template
- `vercel.json` - Vercel deployment config

## Environment Variables Summary

### Render (Backend):
```
NODE_ENV=production
MONGODB_URI=<atlas-connection-string>
JWT_SECRET=<secure-secret>
NEWS_API_KEY=86ffdfd15a784fa3be496a412cff8c4b
FRONTEND_URL=<vercel-url>
CORS_ORIGIN=<vercel-url>
```

### Vercel (Frontend):
```
VITE_API_URL=<render-backend-url>/api
```

## 🎉 Your app will be live on the internet!