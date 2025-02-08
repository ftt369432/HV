import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, Sun } from 'lucide-react';
import { SuggestedPrompt } from './types';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts: SuggestedPrompt[] = [
  {
    id: '1',
    text: "How can I reduce stress?",
    icon: 'brain'
  },
  {
    id: '2',
    text: "Guide me through a meditation",
    icon: 'heart'
  },
  {
    id: '3',
    text: "Track my mood",
    icon: 'sun'
  },
  {
    id: '4',
    text: "Suggest a breathing exercise",
    icon: 'activity'
  }
];

const iconMap = {
  brain: Brain,
  heart: Heart,
  sun: Sun,
  activity: Activity
};

export default function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="p-4 space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Try asking about:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {prompts.map((prompt) => {
          const Icon = iconMap[prompt.icon as keyof typeof iconMap];
          
          return (
            <motion.button
              key={prompt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(prompt.text)}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-left
                       hover:bg-gray-100 dark:hover:bg-gray-700
                       border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-2">
                <Icon className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {prompt.text}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}