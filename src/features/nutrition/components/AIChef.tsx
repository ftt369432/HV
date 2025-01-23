import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chef, MessageSquare, Clock } from 'lucide-react';
import { usePreferencesStore } from '../stores/preferencesStore';

export default function AIChef() {
  const { preferences } = usePreferencesStore();
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response based on preferences
    setTimeout(() => {
      let response = `Based on your ${preferences.dietaryRestrictions.join(', ')} diet preferences, `;
      response += `and your daily goals of ${preferences.calorieGoal} calories, `;
      response += `I recommend the following meal plan...`;

      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Chef className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Chef Assistant
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get personalized meal recommendations
          </p>
        </div>
      </div>

      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about meal suggestions..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>

      {preferences.intermittentFasting.enabled && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium">
              Fasting Window: {preferences.intermittentFasting.startTime} -{' '}
              {new Date(
                new Date(`2000/01/01 ${preferences.intermittentFasting.startTime}`).getTime() +
                  preferences.intermittentFasting.fastingWindow * 60 * 60 * 1000
              ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}