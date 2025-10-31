// src/models/Agent.js
// Represents an AI agent configuration owned by a user.
import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
    },
    temperature: {
      type: Number,
      min: 0,
      max: 2,
      default: 1
    },
    basePrompt: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export const Agent = mongoose.model('Agent', agentSchema);
