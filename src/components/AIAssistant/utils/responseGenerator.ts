const responses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What's on your mind?",
    "Greetings! How may I assist you?"
  ],
  meditation: [
    "Would you like to try a guided meditation session?",
    "I can help you with breathing exercises and meditation.",
    "Let's find a meditation technique that works for you."
  ],
  mood: [
    "How are you feeling today?",
    "Would you like to track your mood?",
    "Let's talk about your emotional well-being."
  ],
  default: [
    "I'm here to help you with your wellness journey.",
    "Feel free to ask me anything about mental health and wellness.",
    "I can assist you with meditation, mood tracking, and more."
  ]
};

export function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return getRandomResponse(responses.greeting);
  }
  
  if (lowerInput.includes('meditat') || lowerInput.includes('breath')) {
    return getRandomResponse(responses.meditation);
  }
  
  if (lowerInput.includes('feel') || lowerInput.includes('mood')) {
    return getRandomResponse(responses.mood);
  }
  
  return getRandomResponse(responses.default);
}

function getRandomResponse(responses: string[]): string {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
} 