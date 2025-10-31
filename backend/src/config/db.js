// src/config/db.js
// Handles MongoDB connection using Mongoose and exposes helper to connect.
import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.mongoUri, {
      autoIndex: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}
