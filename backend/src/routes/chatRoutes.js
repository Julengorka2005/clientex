// src/routes/chatRoutes.js
// Routes for interacting with agent conversations via OpenAI.
import { Router } from 'express';
import { body, param } from 'express-validator';
import { sendMessage, listHistory } from '../controllers/chatController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.get('/:agentId', [param('agentId').isMongoId()], validateRequest, listHistory);

router.post(
  '/:agentId',
  [param('agentId').isMongoId(), body('message').isString().isLength({ min: 1 })],
  validateRequest,
  sendMessage
);

export default router;
