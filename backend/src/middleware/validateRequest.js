// src/middleware/validateRequest.js
// Wraps express-validator results and returns 422 on validation errors.
import { validationResult } from 'express-validator';

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
}
