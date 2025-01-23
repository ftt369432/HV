import React from 'react';
import { format } from 'date-fns';
import { BookOpen } from 'lucide-react';
import { useMentalWellnessStore } from '../../stores/mentalWellnessStore';

export default function JournalPreview() {
  const { journalEntries } = useMentalWellnessStore();
  const recentEntries = journalEntries.slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Journal Entries
        </h3>
        <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentEntries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(entry.createdAt), 'MMM d, yyyy')}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400`}>
                {entry.mood}
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {entry.content}
            </p>
          </div>
        ))}

        {recentEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No journal entries yet
          </div>
        )}
      </div>
    </div>
  );
}