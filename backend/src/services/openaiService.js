// src/services/openaiService.js
// Wraps the OpenAI SDK to provide a simple interface for completions/chat.
import { OpenAI } from 'openai';
import { env } from '../config/env.js';

const client = new OpenAI({ apiKey: env.openAiApiKey });

export async function createChatCompletion({ model, messages, temperature }) {
  const response = await client.chat.completions.create({
    model,
    messages,
    temperature
  });

  return response.choices[0]?.message?.content?.trim() ?? '';
}
