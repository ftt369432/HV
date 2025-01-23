import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Settings } from 'lucide-react';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';

export default function MentalWellnessHeader() {
  const { stats } = useMentalWellnessStore();

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mental Wellness
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stats.weeklyMeditationStreak} day meditation streak
              </p>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}