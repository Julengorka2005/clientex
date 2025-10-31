// src/utils/password.js
// Provides hashing and comparison helpers for storing user passwords securely.
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

async function hash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function compare(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

export const passwordUtils = { hash, compare };
