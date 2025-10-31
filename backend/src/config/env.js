// src/config/env.js
// Centralizes access to environment variables to keep configuration tidy.
import dotenv from 'dotenv';

// Load variables from .env file into process.env
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_agent_builder',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiDefaultModel: process.env.OPENAI_DEFAULT_MODEL || 'gpt-4-turbo'
};

if (!env.openAiApiKey) {
  console.warn('⚠️  OPENAI_API_KEY is not set. Chat endpoints will fail until it is provided.');
}
