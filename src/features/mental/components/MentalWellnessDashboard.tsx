import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, BookOpen, Smile } from 'lucide-react';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';
import MoodTracker from './MoodTracker';
import MeditationStats from './MeditationStats';
import JournalEntries from './JournalEntries';

export default function MentalWellnessDashboard() {
  const { stats, moodEntries, journalEntries } = useMentalWellnessStore();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Meditation
            </h3>
          </div>
          <MeditationStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Smile className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mood Tracking
            </h3>
          </div>
          <MoodTracker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Journal
            </h3>
          </div>
          <JournalEntries entries={journalEntries.slice(0, 3)} />
        </motion.div>
      </div>
    </div>
  );
}