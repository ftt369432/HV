import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Smile, Frown, Meh, Heart, Wind } from 'lucide-react';
import { MoodType, StressLevel } from '../../../components/AIAssistant/types';

interface MoodEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: MoodType, stressLevel: StressLevel, notes: string) => void;
}

const moodOptions: Array<{ type: MoodType; icon: React.ElementType; label: string }> = [
  { type: 'calm', icon: Wind, label: 'Calm' },
  { type: 'energetic', icon: Heart, label: 'Energetic' },
  { type: 'anxious', icon: Meh, label: 'Anxious' },
  { type: 'stressed', icon: Frown, label: 'Stressed' },
  { type: 'tired', icon: Smile, label: 'Tired' }
];

export default function MoodEntryModal({ isOpen, onClose, onSubmit }: MoodEntryModalProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [stressLevel, setStressLevel] = useState<StressLevel>('moderate');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, stressLevel, notes);
      onClose();
      setSelectedMood(null);
      setStressLevel('moderate');
      setNotes('');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            How are you feeling?
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {moodOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setSelectedMood(option.type)}
              className={`p-4 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                selectedMood === option.type
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <option.icon className="h-6 w-6" />
              <span className="text-xs">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stress Level
          </label>
          <select
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value as StressLevel)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white h-24 resize-none"
            placeholder="How are you feeling today?"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save Entry
        </button>
      </motion.div>
    </motion.div>
  );
}