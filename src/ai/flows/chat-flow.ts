
'use server';

import { ai } from '@/ai/genkit';
import { generate } from 'genkit/ai';
import { z } from 'zod';

const HistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })
);

export const chat = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      history: HistorySchema,
      message: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ history, message }) => {
    const systemPrompt = `You are a helpful e-commerce assistant for a store called VSTRADERS.
Your goal is to answer customer questions about products, orders, and policies.
Keep your answers concise and helpful.
The store sells pillows, cushions, mattresses and covers.`;

    const response = await generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: {
        system: systemPrompt,
        history,
        messages: [{ role: 'user', content: [{ text: message }] }],
      },
    });

    return response.text;
  }
);
