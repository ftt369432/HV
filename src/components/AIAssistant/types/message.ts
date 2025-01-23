export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface SuggestedPrompt {
  id: number;
  text: string;
  category: Category;
}

export type Category = 'nutrition' | 'exercise' | 'wellness' | 'mental';