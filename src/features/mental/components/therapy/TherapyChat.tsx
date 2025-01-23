import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain } from 'lucide-react';
import { MoodType } from '../../../../components/AIAssistant/types';
import { generateTherapyResponse } from '../../utils/therapyUtils';

interface TherapyChatProps {
  mood: MoodType;
  onSpeech: (text: string) => void;
  onNext: () => void;
  onUpdateNotes: (notes: string) => void;
}

export default function TherapyChat({ mood, onSpeech, onNext, onUpdateNotes }: TherapyChatProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage = generateTherapyResponse(mood, []);
    setMessages([{ text: initialMessage, sender: 'ai' }]);
    onSpeech(initialMessage);
  }, [mood, onSpeech]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = generateTherapyResponse(mood, [...messages, userMessage]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
      onSpeech(response);
      onUpdateNotes(messages.map(m => m.text).join('\n'));
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Brain className="h-5 w-5" />
        <span>Try Breathing Exercise</span>
      </button>
    </div>
  );
}