# NewsPulse API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com",
    "preferences": {
      "categories": [],
      "darkMode": false
    }
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com",
    "preferences": {
      "categories": [],
      "darkMode": false
    }
  }
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com",
    "preferences": {
      "categories": [],
      "darkMode": false
    }
  }
}
```

### News

#### Get News
```http
GET /news?category=technology&page=1&pageSize=20&sortBy=publishedAt&country=us
```

**Query Parameters:**
- `category` (optional): general, technology, business, sports, health, entertainment
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20, max: 100)
- `sortBy` (optional): publishedAt, relevancy, popularity (default: publishedAt)
- `country` (optional): Country code (default: us)

**Response:**
```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2023-12-01T10:00:00Z",
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "content": "Article content..."
    }
  ],
  "totalResults": 1000,
  "page": 1,
  "pageSize": 20
}
```

#### Search News
```http
GET /news/search?q=artificial intelligence&page=1&pageSize=20&sortBy=publishedAt&from=2023-12-01&to=2023-12-31&language=en
```

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20, max: 100)
- `sortBy` (optional): publishedAt, relevancy, popularity (default: publishedAt)
- `from` (optional): Date from (YYYY-MM-DD)
- `to` (optional): Date to (YYYY-MM-DD)
- `language` (optional): Language code (default: en)

**Response:** Same as Get News

#### Get Categories
```http
GET /news/categories
```

**Response:**
```json
{
  "categories": [
    {
      "id": "general",
      "name": "General",
      "icon": "📰"
    },
    {
      "id": "technology",
      "name": "Technology",
      "icon": "💻"
    }
  ]
}
```

### Bookmarks

#### Create Bookmark
```http
POST /bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "article": {
    "title": "Article Title",
    "description": "Article description",
    "url": "https://example.com/article",
    "urlToImage": "https://example.com/image.jpg",
    "publishedAt": "2023-12-01T10:00:00Z",
    "source": {
      "id": "source-id",
      "name": "Source Name"
    },
    "category": "technology",
    "content": "Article content..."
  }
}
```

**Response:**
```json
{
  "message": "Article bookmarked successfully",
  "bookmark": {
    "_id": "bookmark-id",
    "userId": "user-id",
    "article": {
      "title": "Article Title",
      "description": "Article description",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2023-12-01T10:00:00Z",
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "category": "technology",
      "content": "Article content..."
    },
    "createdAt": "2023-12-01T10:00:00Z",
    "updatedAt": "2023-12-01T10:00:00Z"
  }
}
```

#### Get User Bookmarks
```http
GET /bookmarks?page=1&pageSize=20&category=technology
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20)
- `category` (optional): Filter by category

**Response:**
```json
{
  "bookmarks": [
    {
      "_id": "bookmark-id",
      "userId": "user-id",
      "article": {
        "title": "Article Title",
        "description": "Article description",
        "url": "https://example.com/article",
        "urlToImage": "https://example.com/image.jpg",
        "publishedAt": "2023-12-01T10:00:00Z",
        "source": {
          "id": "source-id",
          "name": "Source Name"
        },
        "category": "technology",
        "content": "Article content..."
      },
      "createdAt": "2023-12-01T10:00:00Z",
      "updatedAt": "2023-12-01T10:00:00Z"
    }
  ],
  "totalResults": 50,
  "page": 1,
  "pageSize": 20
}
```

#### Check if Article is Bookmarked
```http
GET /bookmarks/check?url=https://example.com/article
Authorization: Bearer <token>
```

**Response:**
```json
{
  "isBookmarked": true,
  "bookmarkId": "bookmark-id"
}
```

#### Delete Bookmark
```http
DELETE /bookmarks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Bookmark removed successfully"
}
```

### Health Check

#### Health Status
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

- **General**: 100 requests per 15 minutes per IP
- **NewsAPI**: 1000 requests per day (free tier)

## CORS

The API supports CORS for the configured frontend origin. In development, this is `http://localhost:5173`.

## Security

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Rate limiting is implemented
- Input validation on all endpoints
- CORS protection
- Helmet.js security headers