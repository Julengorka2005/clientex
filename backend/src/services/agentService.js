// src/services/agentService.js
// Business logic for creating, reading, updating, and deleting agents.
import createError from 'http-errors';
import { Agent } from '../models/Agent.js';

function sanitize(agent) {
  return {
    id: agent.id,
    name: agent.name,
    role: agent.role,
    description: agent.description,
    model: agent.model,
    temperature: agent.temperature,
    basePrompt: agent.basePrompt,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt
  };
}

export const agentService = {
  async listForUser(userId) {
    const agents = await Agent.find({ owner: userId }).sort({ updatedAt: -1 });
    return agents.map(sanitize);
  },

  async create(userId, data) {
    const agent = await Agent.create({ ...data, owner: userId });
    return sanitize(agent);
  },

  async getById(userId, agentId) {
    const agent = await Agent.findOne({ _id: agentId, owner: userId });
    if (!agent) {
      throw createError(404, 'Agent not found');
    }
    return sanitize(agent);
  },

  async update(userId, agentId, data) {
    const agent = await Agent.findOneAndUpdate(
      { _id: agentId, owner: userId },
      data,
      { new: true, runValidators: true }
    );
    if (!agent) {
      throw createError(404, 'Agent not found');
    }
    return sanitize(agent);
  },

  async remove(userId, agentId) {
    const agent = await Agent.findOneAndDelete({ _id: agentId, owner: userId });
    if (!agent) {
      throw createError(404, 'Agent not found');
    }
  }
};
