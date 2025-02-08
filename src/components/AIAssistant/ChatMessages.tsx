import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start space-x-2 ${
            message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${message.sender === 'user' 
              ? 'bg-purple-100 dark:bg-purple-900/30' 
              : 'bg-gray-100 dark:bg-gray-800'
            }
          `}>
            {message.sender === 'user' ? (
              <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            ) : (
              <Bot className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </div>

          <div className={`
            max-w-[80%] rounded-lg px-4 py-2
            ${message.sender === 'user'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
            }
          `}>
            <p className="text-sm">{message.content}</p>
            <span className={`
              text-xs mt-1 block
              ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}
            `}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </motion.div>
      ))}

      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 
                       flex items-center justify-center">
            <Bot className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}