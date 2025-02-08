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

    try {
      const response = await generateResponse(content);
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} isTyping={isTyping} />
        {messages.length === 0 && <SuggestedPrompts onSelect={handleSendMessage} />}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}