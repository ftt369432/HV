import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Wind } from 'lucide-react';
import { MoodType } from '../../../../components/AIAssistant/types';
import { useMentalWellnessStore } from '../../stores/mentalWellnessStore';

const moodIcons = {
  calm: Wind,
  energetic: Heart,
  anxious: Meh,
  stressed: Frown,
  tired: Smile
};

const moodColors = {
  calm: 'text-blue-500',
  energetic: 'text-green-500',
  anxious: 'text-yellow-500',
  stressed: 'text-red-500',
  tired: 'text-purple-500'
};

export default function MoodTracker() {
  const { moodEntries, addMoodEntry } = useMentalWellnessStore();
  const recentMoods = moodEntries.slice(-7);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Mood Tracking
      </h3>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {(Object.keys(moodIcons) as MoodType[]).map((mood) => {
          const Icon = moodIcons[mood];
          return (
            <motion.button
              key={mood}
              onClick={() => addMoodEntry({ mood, stressLevel: 'moderate', notes: '', timestamp: new Date() })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg flex flex-col items-center space-y-2 bg-gray-50 dark:bg-gray-700"
            >
              <Icon className={`h-6 w-6 ${moodColors[mood]}`} />
              <span className="text-xs capitalize text-gray-600 dark:text-gray-300">
                {mood}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        {recentMoods.map((entry, index) => {
          const Icon = moodIcons[entry.mood];
          return (
            <div key={entry.id} className="text-center">
              <div className={`w-10 h-10 rounded-full mx-auto mb-1 bg-gray-50 dark:bg-gray-700 flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${moodColors[entry.mood]}`} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {getDayLabel(index)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getDayLabel(index: number) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return days[(today - (6 - index) + 7) % 7];
}