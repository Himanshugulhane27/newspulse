// documenting old route structure before cleanup
// this was the original routing before we modularized

/*
OLD STRUCTURE (pre-refactor):
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/news?category=X&page=Y
  GET  /api/news/search?q=X
  POST /api/bookmarks
  GET  /api/bookmarks
  DELETE /api/bookmarks/:id

NEW STRUCTURE (current):
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/auth/google
  GET  /api/auth/google/callback
  GET  /api/auth/me
  GET  /api/news?category=X&page=Y&pageSize=Z
  POST /api/bookmarks
  GET  /api/bookmarks
  DELETE /api/bookmarks/:id

PLANNED (not implemented):
  GET  /api/news/trending
  GET  /api/news/search?q=X
  GET  /api/news/sources
  GET  /api/user/preferences
  PUT  /api/user/preferences
  GET  /api/analytics/overview (admin only)
*/

module.exports = {};
