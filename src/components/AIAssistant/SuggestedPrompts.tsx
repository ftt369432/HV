import React from 'react';
import { motion } from 'framer-motion';
import { SuggestedPrompt } from './types';
import PromptButton from './PromptButton';

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onPromptClick: (prompt: SuggestedPrompt) => void;
}

export default function SuggestedPrompts({ prompts, onPromptClick }: SuggestedPromptsProps) {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Suggested Questions</h4>
      <div className="grid grid-cols-2 gap-2">
        {prompts.map((prompt) => (
          <PromptButton key={prompt.id} prompt={prompt} onClick={() => onPromptClick(prompt)} />
        ))}
      </div>
    </div>
  );
}