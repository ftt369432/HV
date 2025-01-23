import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { MoodType } from '../../../components/AIAssistant/types';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';

const moodColors: Record<MoodType, string> = {
  anxious: 'bg-yellow-200 dark:bg-yellow-900',
  stressed: 'bg-red-200 dark:bg-red-900',
  tired: 'bg-purple-200 dark:bg-purple-900',
  calm: 'bg-blue-200 dark:bg-blue-900',
  energetic: 'bg-green-200 dark:bg-green-900'
};

export default function MoodCalendar() {
  const { moodEntries } = useMentalWellnessStore();
  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Weekly Mood Overview
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dayMood = moodEntries.find(
            entry => format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          );

          return (
            <div key={date.toString()} className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {format(date, 'EEE')}
              </div>
              <div
                className={`h-12 w-12 mx-auto rounded-lg flex items-center justify-center ${
                  dayMood ? moodColors[dayMood.mood] : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <span className="text-sm font-medium">
                  {format(date, 'd')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}