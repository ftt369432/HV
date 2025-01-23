import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Wind, Brain } from 'lucide-react';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';
import { MoodType } from '../../../components/AIAssistant/types';
import AITherapist from './AITherapist';

const moodIcons = {
  calm: Wind,
  energetic: Heart,
  anxious: Meh,
  stressed: Frown,
  tired: Smile
};

const moodColors = {
  calm: 'bg-blue-500',
  energetic: 'bg-green-500',
  anxious: 'bg-yellow-500',
  stressed: 'bg-red-500',
  tired: 'bg-purple-500'
};

export default function MoodTracker() {
  const { moodEntries, addMoodEntry } = useMentalWellnessStore();
  const [showAITherapist, setShowAITherapist] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setShowAITherapist(true);
  };

  const recentMoods = moodEntries.slice(-7);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {(Object.keys(moodIcons) as MoodType[]).map((mood) => {
          const Icon = moodIcons[mood];
          return (
            <motion.button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg flex flex-col items-center space-y-2 ${
                selectedMood === mood
                  ? `${moodColors[mood]} text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs capitalize">{mood}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Recent Moods
        </h4>
        <button
          onClick={() => setShowAITherapist(true)}
          className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400"
        >
          <Brain className="h-4 w-4" />
          <span>Talk to AI Therapist</span>
        </button>
      </div>

      <div className="flex justify-between">
        {recentMoods.map((entry, index) => {
          const Icon = moodIcons[entry.mood];
          return (
            <div key={entry.id} className="text-center">
              <div className={`w-10 h-10 rounded-full mx-auto mb-1 ${moodColors[entry.mood]} flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {getDayLabel(index)}
              </span>
            </div>
          );
        })}
      </div>

      {showAITherapist && (
        <AITherapist
          mood={selectedMood}
          onClose={() => setShowAITherapist(false)}
          onSaveMood={(notes) => {
            if (selectedMood) {
              addMoodEntry({
                mood: selectedMood,
                stressLevel: 'moderate',
                notes,
                timestamp: new Date()
              });
            }
            setShowAITherapist(false);
            setSelectedMood(null);
          }}
        />
      )}
    </div>
  );
}

function getDayLabel(index: number) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return days[(today - (6 - index) + 7) % 7];
}