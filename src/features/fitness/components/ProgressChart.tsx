import React from 'react';
import { Activity, Flame, Calendar } from 'lucide-react';
import { useFitnessStore } from '../stores/fitnessStore';
import { format, subDays } from 'date-fns';

export default function ProgressChart() {
  const { workoutHistory } = useFitnessStore();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const workouts = workoutHistory.filter(w => 
      format(new Date(w.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return {
      date,
      calories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
      duration: workouts.reduce((sum, w) => sum + w.duration, 0)
    };
  }).reverse();

  const maxCalories = Math.max(...last7Days.map(d => d.calories));
  const maxDuration = Math.max(...last7Days.map(d => d.duration));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly Progress
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Calories</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-40 mb-6">
        <div className="absolute inset-0 flex items-end justify-between">
          {last7Days.map((day, i) => (
            <div key={i} className="flex flex-col items-center w-1/7">
              <div className="relative w-full h-full">
                <div 
                  className="absolute bottom-0 w-2 bg-blue-500 dark:bg-blue-600 rounded-t left-1/2 transform -translate-x-3"
                  style={{ 
                    height: `${(day.calories / maxCalories) * 100}%`,
                    opacity: maxCalories === 0 ? 0.3 : 1
                  }}
                />
                <div 
                  className="absolute bottom-0 w-2 bg-green-500 dark:bg-green-600 rounded-t left-1/2 transform translate-x-1"
                  style={{ 
                    height: `${(day.duration / maxDuration) * 100}%`,
                    opacity: maxDuration === 0 ? 0.3 : 1
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                {format(day.date, 'EEE')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Workouts
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {workoutHistory.length}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Calories
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {last7Days.reduce((sum, d) => sum + d.calories, 0)}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Minutes
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {last7Days.reduce((sum, d) => sum + d.duration, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}