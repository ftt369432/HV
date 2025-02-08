import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful';

interface MoodEntry {
  date: Date;
  mood: Mood;
  note?: string;
}

const moods: Record<Mood, { emoji: string; label: string; color: string }> = {
  great: { emoji: '😄', label: 'Great', color: 'bg-green-500' },
  good: { emoji: '🙂', label: 'Good', color: 'bg-blue-500' },
  okay: { emoji: '😐', label: 'Okay', color: 'bg-yellow-500' },
  bad: { emoji: '😕', label: 'Bad', color: 'bg-orange-500' },
  awful: { emoji: '😢', label: 'Awful', color: 'bg-red-500' }
};

export default function MoodTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [entries] = useState<MoodEntry[]>([
    { date: new Date(), mood: 'good', note: 'Had a productive day!' }
  ]);

  const handlePrevDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const handleSave = () => {
    if (!selectedMood) return;
    // Add save logic here
  };

  return (
    <div className="p-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevDay}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextDay}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {(Object.entries(moods) as [Mood, typeof moods[Mood]][]).map(([key, { emoji, label, color }]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(key)}
            className={`
              p-4 rounded-lg flex flex-col items-center space-y-2
              ${selectedMood === key 
                ? `${color} text-white` 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              }
            `}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Note Input */}
      <div className="mb-8">
        <label 
          htmlFor="note" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Add a note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          placeholder="How are you feeling today?"
        />
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={!selectedMood}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-purple-700 focus:outline-none focus:ring-2
                 focus:ring-purple-500 focus:ring-offset-2"
      >
        Save Entry
      </motion.button>

      {/* Previous Entries */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Previous Entries
        </h3>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {entry.date.toLocaleDateString()}
                </span>
                <span className="text-2xl">
                  {moods[entry.mood].emoji}
                </span>
              </div>
              {entry.note && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}