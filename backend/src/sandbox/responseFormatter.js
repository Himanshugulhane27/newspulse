// standardized API response formatter
// ensures all endpoints return consistent structure
const formatSuccess = (data, message = 'Success', meta = {}) => ({
  success: true,
  message,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    ...meta
  }
});

const formatError = (message, code = 500, details = null) => ({
  success: false,
  error: {
    message,
    code,
    ...(details && { details })
  },
  meta: {
    timestamp: new Date().toISOString()
  }
});

const formatPaginated = (data, page, pageSize, total) => ({
  success: true,
  data,
  pagination: {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    hasNext: page * pageSize < total,
    hasPrev: page > 1
  },
  meta: { timestamp: new Date().toISOString() }
});

module.exports = { formatSuccess, formatError, formatPaginated };
