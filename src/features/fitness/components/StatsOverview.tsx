import React from 'react';
import { useFitnessStore } from '../stores/fitnessStore';
import { MuscleGroup } from '../types';

export default function StatsOverview() {
  const { stats } = useFitnessStore();

  const getMuscleGroupColor = (group: MuscleGroup) => {
    const colors: Record<MuscleGroup, string> = {
      chest: 'bg-red-500',
      back: 'bg-blue-500',
      legs: 'bg-green-500',
      arms: 'bg-yellow-500',
      shoulders: 'bg-purple-500',
      core: 'bg-pink-500',
      full_body: 'bg-indigo-500'
    };
    return colors[group];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Muscle Group Balance
      </h3>
      <div className="space-y-4">
        {Object.entries(stats.muscleGroupBalance).map(([group, value]) => (
          <div key={group} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="capitalize text-gray-700 dark:text-gray-300">
                {group.replace('_', ' ')}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {value} workouts
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full ${getMuscleGroupColor(group as MuscleGroup)} rounded-full`}
                style={{
                  width: `${Math.min((value / Math.max(...Object.values(stats.muscleGroupBalance))) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}