// src/services/authService.js
// Encapsulates authentication logic including hashing and credential validation.
import createError from 'http-errors';
import { User } from '../models/User.js';
import { passwordUtils } from '../utils/password.js';
import { tokenService } from './tokenService.js';

export const authService = {
  async register({ name, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw createError(409, 'Email already registered');
    }

    const hashedPassword = await passwordUtils.hash(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = tokenService.signToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Invalid credentials');
    }

    const passwordValid = await passwordUtils.compare(password, user.password);
    if (!passwordValid) {
      throw createError(401, 'Invalid credentials');
    }

    const token = tokenService.signToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }
};
