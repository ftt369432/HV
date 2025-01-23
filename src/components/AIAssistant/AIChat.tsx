import React, { useState, useCallback } from 'react';
import { Bot } from 'lucide-react';
import { Message, SuggestedPrompt } from './types';
import { generateResponse } from './utils/responseGenerator';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(content);
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 w-96">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden 
                    border border-gray-200 dark:border-gray-700 flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              AI Assistant
            </span>
          </div>
        </div>

        {/* Messages */}
        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
        />

        {/* Suggested Prompts */}
        {messages.length === 0 && (
          <SuggestedPrompts onSelect={handleSendMessage} />
        )}

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}