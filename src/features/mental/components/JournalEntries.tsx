import React from 'react';
import { format } from 'date-fns';
import { JournalEntry } from '../types';

interface JournalEntriesProps {
  entries: JournalEntry[];
}

export default function JournalEntries({ entries }: JournalEntriesProps) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(entry.createdAt), 'MMM d, yyyy')}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${getMoodColor(entry.mood)}`}>
              {entry.mood}
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {entry.content}
          </p>
        </div>
      ))}

      {entries.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No journal entries yet
        </div>
      )}

      <button className="w-full py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
        View All Entries
      </button>
    </div>
  );
}

function getMoodColor(mood: string) {
  const colors = {
    happy: 'bg-yellow-100 text-yellow-800',
    calm: 'bg-blue-100 text-blue-800',
    anxious: 'bg-purple-100 text-purple-800',
    sad: 'bg-gray-100 text-gray-800',
    energetic: 'bg-green-100 text-green-800'
  };
  return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}