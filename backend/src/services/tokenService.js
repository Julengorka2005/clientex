// src/services/tokenService.js
// Utility helpers for issuing JWT access tokens.
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

function signToken(userId) {
  return jwt.sign({ sub: userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

export const tokenService = { signToken };
