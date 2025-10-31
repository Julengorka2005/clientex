// src/controllers/agentController.js
// CRUD operations for managing AI agents.
import { agentService } from '../services/agentService.js';

export async function listAgents(req, res, next) {
  try {
    const agents = await agentService.listForUser(req.user.id);
    return res.json(agents);
  } catch (error) {
    return next(error);
  }
}

export async function createAgent(req, res, next) {
  try {
    const agent = await agentService.create(req.user.id, req.body);
    return res.status(201).json(agent);
  } catch (error) {
    return next(error);
  }
}

export async function getAgent(req, res, next) {
  try {
    const agent = await agentService.getById(req.user.id, req.params.id);
    return res.json(agent);
  } catch (error) {
    return next(error);
  }
}

export async function updateAgent(req, res, next) {
  try {
    const agent = await agentService.update(req.user.id, req.params.id, req.body);
    return res.json(agent);
  } catch (error) {
    return next(error);
  }
}

export async function deleteAgent(req, res, next) {
  try {
    await agentService.remove(req.user.id, req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
