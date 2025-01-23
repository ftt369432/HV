import React from 'react';
import { motion } from 'framer-motion';
import { SuggestedPrompt } from './types';

interface PromptButtonProps {
  prompt: SuggestedPrompt;
  onClick: () => void;
}

export default function PromptButton({ prompt, onClick }: PromptButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-3 text-sm text-left rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
    >
      {prompt.text}
    </motion.button>
  );
}