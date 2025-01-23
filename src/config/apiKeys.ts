// Define supported AI providers
export type AIProvider = 'grok' | 'openai' | 'gemini' | 'llama' | 'anthropic' | 'mistral';

export interface APIKeys {
  grok: string;
  openai: string;
  gemini: string;
  llama: string;
  anthropic: string;
  mistral: string;
}

export interface ProviderConfig {
  name: string;
  description: string;
  docsUrl: string;
  placeholder: string;
}

export const providerConfigs: Record<AIProvider, ProviderConfig> = {
  grok: {
    name: 'Grok',
    description: 'xAI\'s conversational AI model',
    docsUrl: 'https://grok.x.ai/docs',
    placeholder: 'xai-...'
  },
  openai: {
    name: 'OpenAI',
    description: 'GPT-4 and other OpenAI models',
    docsUrl: 'https://platform.openai.com/docs',
    placeholder: 'sk-...'
  },
  gemini: {
    name: 'Google Gemini',
    description: 'Google\'s most capable AI model',
    docsUrl: 'https://ai.google.dev/docs',
    placeholder: 'AIza...'
  },
  llama: {
    name: 'Llama',
    description: 'Meta\'s open source LLM',
    docsUrl: 'https://llama.meta.com/get-started',
    placeholder: 'llm-...'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude and other Anthropic models',
    docsUrl: 'https://docs.anthropic.com',
    placeholder: 'sk-ant-...'
  },
  mistral: {
    name: 'Mistral AI',
    description: 'Mistral\'s advanced language models',
    docsUrl: 'https://docs.mistral.ai',
    placeholder: 'mist-...'
  }
};

// Default configuration with empty keys
const defaultConfig: APIKeys = {
  grok: '',
  openai: '',
  gemini: '',
  llama: '',
  anthropic: '',
  mistral: ''
};

// Load configuration from localStorage
export function loadAPIKeys(): APIKeys {
  try {
    const saved = localStorage.getItem('apiKeys');
    return saved ? JSON.parse(saved) : defaultConfig;
  } catch {
    return defaultConfig;
  }
}

// Save configuration to localStorage
export function saveAPIKeys(keys: APIKeys): void {
  localStorage.setItem('apiKeys', JSON.stringify(keys));
}

// Get a specific API key
export function getAPIKey(provider: AIProvider): string {
  const config = loadAPIKeys();
  return config[provider];
}