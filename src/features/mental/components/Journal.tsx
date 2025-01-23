import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Save, Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood?: string;
}

export default function Journal() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(),
      content: 'Today was a productive day. I managed to complete all my tasks and even had time for a short meditation session.',
      mood: '😊'
    }
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
    if (!content.trim()) return;
    // Add save logic here
    setContent('');
    setIsEditing(false);
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

      {/* Journal Entry */}
      <div className="mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          placeholder="Write your thoughts for today..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setContent('')}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Trash2 className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={!content.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center space-x-2
                   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
        >
          <Save className="h-5 w-5" />
          <span>Save Entry</span>
        </motion.button>
      </div>

      {/* Previous Entries */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Previous Entries
        </h3>
        <div className="space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {entry.date.toLocaleDateString()}
                  </span>
                  {entry.mood && (
                    <span className="text-xl">{entry.mood}</span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setContent(entry.content);
                    setIsEditing(true);
                  }}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <Edit2 className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {entry.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 