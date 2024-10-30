import { generate } from '@genkit-ai/ai'
import { configureGenkit } from '@genkit-ai/core'
import { noAuth, onFlow } from '@genkit-ai/firebase/functions'
import { gemini15Flash, googleAI } from '@genkit-ai/googleai'
import * as z from 'zod'

configureGenkit({
  plugins: [
    googleAI(), //
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export const menuSuggestionFlow = onFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
    authPolicy: noAuth(),
  },
  async (subject: string) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    })

    return llmResponse.text()
  },
)
