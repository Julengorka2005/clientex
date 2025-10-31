// src/controllers/authController.js
// Handles registration and login requests by delegating to the authentication service.
import { authService } from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}
