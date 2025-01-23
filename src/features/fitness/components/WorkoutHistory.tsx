import React from 'react';
import { format } from 'date-fns';
import { useFitnessStore } from '../stores/fitnessStore';
import { Activity, Calendar } from 'lucide-react';

export default function WorkoutHistory() {
  const { workoutHistory } = useFitnessStore();
  const recentWorkouts = workoutHistory.slice(-5).reverse();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Workouts
      </h3>
      <div className="space-y-4">
        {recentWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {workout.exercises.length} exercises
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(workout.date), 'MMM d, yyyy')}
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {workout.duration} minutes • {workout.caloriesBurned} calories
              </div>
            </div>
          </div>
        ))}

        {recentWorkouts.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No workouts recorded yet
          </div>
        )}
      </div>
    </div>
  );
}