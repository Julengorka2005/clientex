// src/controllers/chatController.js
// Relays chat messages to OpenAI while persisting the exchange history.
import { chatService } from '../services/chatService.js';

export async function sendMessage(req, res, next) {
  try {
    const { agentId } = req.params;
    const response = await chatService.sendMessage({
      agentId,
      userId: req.user.id,
      message: req.body.message
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function listHistory(req, res, next) {
  try {
    const { agentId } = req.params;
    const history = await chatService.getHistory({ agentId, userId: req.user.id });
    return res.json(history);
  } catch (error) {
    return next(error);
  }
}
