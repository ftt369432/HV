import React from 'react';
import { Brain, Clock, Calendar } from 'lucide-react';
import { useMentalWellnessStore } from '../../stores/mentalWellnessStore';

export default function MeditationStats() {
  const { stats } = useMentalWellnessStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Meditation Progress
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <Clock className="h-6 w-6 text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalMeditationMinutes}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Minutes
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <Calendar className="h-6 w-6 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.weeklyMeditationStreak}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Day Streak
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <Brain className="h-6 w-6 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.monthlyMoodTrend.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sessions
          </div>
        </div>
      </div>
    </div>
  );
}