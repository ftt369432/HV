import { MoodType } from '../../../components/AIAssistant/types';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const moodResponses: Record<MoodType, string[]> = {
  anxious: [
    "I notice you're feeling anxious. Let's explore what's causing these feelings.",
    "Anxiety can be overwhelming. Would you like to try a calming breathing exercise?",
    "What specific situations are triggering your anxiety right now?",
    "Let's work on some grounding techniques together."
  ],
  stressed: [
    "I understand you're feeling stressed. Let's break down what's contributing to this.",
    "Sometimes stress can feel overwhelming. What's your biggest concern right now?",
    "Would you like to explore some stress management techniques?",
    "Let's identify what aspects are within your control."
  ],
  tired: [
    "Being tired can affect us in many ways. How's your sleep quality been?",
    "Let's explore what might be draining your energy.",
    "Would you like to discuss some energy management strategies?",
    "Sometimes fatigue can be related to our daily routines. Shall we look at yours?"
  ],
  calm: [
    "It's great that you're feeling calm. What's contributing to this peaceful state?",
    "Let's explore how to maintain this sense of tranquility.",
    "What practices have helped you achieve this calmness?",
    "Would you like to deepen this state with a mindfulness exercise?"
  ],
  energetic: [
    "It's wonderful that you're feeling energetic! How would you like to channel this energy?",
    "Let's make the most of this positive state.",
    "What sparked this energy boost?",
    "Would you like to explore productive ways to use this energy?"
  ]
};

const followUpQuestions = [
  "How long have you been feeling this way?",
  "What helps you feel better when you experience this?",
  "Have you noticed any patterns or triggers?",
  "What would you like to focus on in our session today?"
];

export function generateTherapyResponse(mood: MoodType, conversation: Message[]): string {
  if (conversation.length === 0) {
    return moodResponses[mood][0];
  }

  const lastMessage = conversation[conversation.length - 1];
  
  // If the last message was from the AI, return a follow-up question
  if (lastMessage.sender === 'ai') {
    return followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
  }

  // Analyze the user's message for keywords and provide appropriate responses
  const userMessage = lastMessage.text.toLowerCase();
  
  if (userMessage.includes('yes') || userMessage.includes('yeah')) {
    return "Can you tell me more about that?";
  }

  if (userMessage.includes('no') || userMessage.includes('not')) {
    return "I understand. What would feel more helpful to explore?";
  }

  if (userMessage.includes('help') || userMessage.includes('need')) {
    return "I'm here to support you. Let's break this down together. What's the most pressing concern?";
  }

  if (userMessage.includes('thank')) {
    return "You're welcome. Is there anything else you'd like to explore?";
  }

  // If no specific patterns are matched, return a mood-specific response
  return moodResponses[mood][Math.floor(Math.random() * moodResponses[mood].length)];
}