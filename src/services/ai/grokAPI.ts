import { getAPIKey } from '../../config/apiKeys';

export interface GrokResponse {
  response: string;
  // Add other response fields as needed
}

export async function askGrok(prompt: string): Promise<GrokResponse> {
  const apiKey = getAPIKey('grok');
  
  if (!apiKey) {
    throw new Error('Grok API key not configured');
  }

  try {
    const response = await fetch('https://api.grok.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'grok-1',
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Grok API:', error);
    throw error;
  }
}