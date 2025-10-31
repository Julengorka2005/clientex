// src/middleware/authMiddleware.js
// Express middleware that validates JWT bearer tokens and attaches user info to the request.
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(payload.sub).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
