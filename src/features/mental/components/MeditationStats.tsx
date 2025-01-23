import React from 'react';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';

export default function MeditationStats() {
  const { stats } = useMentalWellnessStore();

  return (
    <div className="space-y-4">
      <div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {stats.totalMeditationMinutes}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">minutes</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total meditation time</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${(stats.weeklyMeditationStreak / 7) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {stats.weeklyMeditationStreak}/7 days
        </span>
      </div>
    </div>
  );
}