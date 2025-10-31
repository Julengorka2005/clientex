// src/middleware/errorHandler.js
// Centralized error handler to ensure consistent API responses.
export function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  return res.status(status).json({ message });
}
