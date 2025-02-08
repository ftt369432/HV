import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  Target,
  MessageSquare,
  Dumbbell,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';

export default function AICoach() {
  const { isCyberpunk } = useTheme();
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const startWorkoutPlanning = async () => {
    setConversation([
      {
        role: 'assistant',
        content: "Hi! I'm your AI Workout Coach. Let's create a perfect workout plan for you. What's your main fitness goal?",
        options: [
          'Build Muscle',
          'Lose Weight',
          'Improve Endurance',
          'Increase Strength',
          'General Fitness'
        ]
      }
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isCyberpunk
              ? 'bg-gradient-to-br from-purple-500 to-pink-500'
              : 'bg-primary-50 dark:bg-primary-900/10'
          }`}>
            <Brain className={`h-6 w-6 ${
              isCyberpunk ? 'text-white' : 'text-primary-500'
            }`} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Workout Coach
          </h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startWorkoutPlanning}
          className={`px-4 py-2 rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
        >
          <span className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Start New Plan</span>
          </span>
        </motion.button>
      </div>

      {/* Chat Interface */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg ${
                message.role === 'assistant'
                  ? isCyberpunk
                    ? 'bg-gray-800/50 border border-purple-500/20'
                    : 'bg-gray-100 dark:bg-gray-800'
                  : isCyberpunk
                    ? 'bg-purple-500/10'
                    : 'bg-primary-50 dark:bg-primary-900/10'
              }`}
            >
              <p className="text-gray-900 dark:text-white mb-4">
                {message.content}
              </p>
              
              {message.options && (
                <div className="grid grid-cols-2 gap-2">
                  {message.options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg text-left ${
                        isCyberpunk
                          ? 'bg-gray-900/50 hover:bg-gray-900/70 border border-purple-500/20'
                          : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 