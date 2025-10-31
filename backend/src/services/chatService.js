// src/services/chatService.js
// Coordinates between agent configuration, message persistence, and OpenAI responses.
import createError from 'http-errors';
import { Agent } from '../models/Agent.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { createChatCompletion } from './openaiService.js';

export const chatService = {
  async sendMessage({ agentId, userId, message }) {
    if (!message) {
      throw createError(400, 'Message text is required');
    }

    const agent = await Agent.findOne({ _id: agentId, owner: userId });
    if (!agent) {
      throw createError(404, 'Agent not found');
    }

    const history = await ChatMessage.find({ agent: agentId, user: userId })
      .sort({ createdAt: 1 })
      .limit(20);

    const messages = [];
    if (agent.basePrompt) {
      messages.push({ role: 'system', content: agent.basePrompt });
    }

    history.forEach((entry) => {
      messages.push({ role: entry.role, content: entry.content });
    });

    messages.push({ role: 'user', content: message });

    await ChatMessage.create({ agent: agentId, user: userId, role: 'user', content: message });

    const assistantMessage = await createChatCompletion({
      model: agent.model,
      temperature: agent.temperature,
      messages
    });

    await ChatMessage.create({
      agent: agentId,
      user: userId,
      role: 'assistant',
      content: assistantMessage
    });

    return {
      reply: assistantMessage
    };
  },

  async getHistory({ agentId, userId }) {
    const agent = await Agent.findOne({ _id: agentId, owner: userId });
    if (!agent) {
      throw createError(404, 'Agent not found');
    }

    const messages = await ChatMessage.find({ agent: agentId, user: userId })
      .sort({ createdAt: 1 })
      .lean();

    return messages.map((msg) => ({
      id: msg._id.toString(),
      role: msg.role,
      content: msg.content,
      createdAt: msg.createdAt
    }));
  }
};
