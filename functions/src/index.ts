import { generate } from '@genkit-ai/ai'
import { configureGenkit } from '@genkit-ai/core'
import { noAuth, onFlow } from '@genkit-ai/firebase/functions'
import { gemini15Flash, googleAI } from '@genkit-ai/googleai'
import * as z from 'zod'

// Import the Firebase plugin into your Genkit configuration file (where configureGenkit is located):
import { firebase } from '@genkit-ai/firebase'

// Add `firebase()` to the list of plugins and add additional configuration options:
configureGenkit({
  plugins: [
    googleAI(), //
    firebase(), //
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
  telemetry: {
    instrumentation: 'firebase',
    logger: 'firebase',
  },
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
