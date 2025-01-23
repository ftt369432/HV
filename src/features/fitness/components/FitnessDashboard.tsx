import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Calendar, Target } from 'lucide-react';
import { useFitnessStore } from '../stores/fitnessStore';
import WorkoutHistory from './WorkoutHistory';
import StatsOverview from './StatsOverview';
import AIRecommendations from './AIRecommendations';
import ProgressChart from './ProgressChart';

export default function FitnessDashboard() {
  const { stats, goals } = useFitnessStore();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Workouts
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalWorkouts}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total sessions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="h-6 w-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Calories
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalCaloriesBurned}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total burned</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Streak
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.weeklyStreak}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Days active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Goal
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {goals.weeklyWorkouts}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Weekly target</p>
        </motion.div>
      </div>

      <ProgressChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsOverview />
        <WorkoutHistory />
      </div>

      <AIRecommendations />
    </div>
  );
}