import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message } from './types';
import { createSpeechSynthesisUtterance } from './utils/speechUtils';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  const speakMessage = () => {
    if (isUser) return;
    
    const utterance = createSpeechSynthesisUtterance(message.content);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`p-2 rounded-lg ${
          isUser ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          {isUser ? (
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          ) : (
            <Bot className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        <div
          className={`relative group p-3 rounded-2xl ${
            isUser
              ? 'bg-primary-600 dark:bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {!isUser && (
            <button
              onClick={speakMessage}
              className="absolute right-2 top-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Listen to message"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}