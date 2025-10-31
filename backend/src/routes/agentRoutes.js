// src/routes/agentRoutes.js
// CRUD endpoints for AI agent configurations.
import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  listAgents,
  createAgent,
  getAgent,
  updateAgent,
  deleteAgent
} from '../controllers/agentController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

const agentValidators = [
  body('name').isLength({ min: 2 }).withMessage('Name is required'),
  body('role').isLength({ min: 2 }).withMessage('Role is required'),
  body('description').optional().isString(),
  body('model').isString().withMessage('Model is required'),
  body('temperature').optional().isFloat({ min: 0, max: 2 }),
  body('basePrompt').optional().isString()
];

router.get('/', listAgents);
router.post('/', agentValidators, validateRequest, createAgent);
router.get('/:id', [param('id').isMongoId()], validateRequest, getAgent);
router.put('/:id', [param('id').isMongoId(), ...agentValidators], validateRequest, updateAgent);
router.delete('/:id', [param('id').isMongoId()], validateRequest, deleteAgent);

export default router;
