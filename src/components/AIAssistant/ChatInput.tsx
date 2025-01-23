import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import VoiceInput from './VoiceInput';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onVoiceToggle: () => void;
}

export default function ChatInput({ onSendMessage, onVoiceToggle }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    onSendMessage(input);
    setInput('');
    setIsSubmitting(false);
    inputRef.current?.focus();
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
    inputRef.current?.focus();
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <VoiceInput 
          onTranscript={handleVoiceInput}
          disabled={isSubmitting}
        />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about nutrition, exercise, or wellness... (Ctrl/Cmd + Enter to send)"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
          autoFocus
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="p-2 rounded-lg bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Send message (Ctrl/Cmd + Enter)"
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </form>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between px-2">
        <span>Press Ctrl/Cmd + Enter to send</span>
        <span>Press Ctrl/Cmd + M for voice input</span>
      </div>
    </div>
  );
}