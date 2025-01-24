import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Calendar, 
  Activity, 
  Flame, 
  Timer, 
  TrendingUp,
  Plus,
  BarChart3,
  Heart,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { format } from 'date-fns';
import { useWorkoutStore } from '../stores/workoutStore';
import { useTheme } from '../../../contexts/ThemeContext';
import AddWorkoutModal from './AddWorkoutModal';
import WorkoutHistory from './WorkoutHistory';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';

export default function WorkoutTracker() {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const { isCyberpunk } = useTheme();
  const stats = useWorkoutStore(state => state.getTotalStats());

  const statCards = [
    {
      title: 'Total Workouts',
      value: stats.totalWorkouts,
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      trend: '+12%'
    },
    {
      title: 'Calories Burned',
      value: stats.caloriesBurned.toLocaleString(),
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      trend: '+8%'
    },
    {
      title: 'Active Minutes',
      value: `${Math.floor(stats.totalDuration / 60)}h ${stats.totalDuration % 60}m`,
      icon: Timer,
      color: 'from-cyan-500 to-blue-500',
      trend: '+15%'
    },
    {
      title: 'Current Streak',
      value: `${stats.streakDays} days`,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      trend: 'Best: 14'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 rounded-2xl ${
        isCyberpunk 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
          : 'bg-primary-50 dark:bg-gray-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl ${
                isCyberpunk
                  ? 'bg-white/10 backdrop-blur-sm'
                  : 'bg-white dark:bg-gray-700'
              }`}
            >
              <Dumbbell className="h-8 w-8 text-primary-500 dark:text-primary-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Workout Tracker
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your fitness progress
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddWorkout(true)}
            className={`px-4 py-2 ${
              isCyberpunk
                ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white rounded-xl flex items-center space-x-2`}
          >
            <Plus className="h-5 w-5" />
            <span>Add Workout</span>
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs text-white/80">{stat.trend}</span>
                </div>
                <div className="mt-2">
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-sm text-white/80">{stat.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 shadow-lg ${getCardBackground(isCyberpunk)}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-medium text-white">Activity Overview</h3>
            </div>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 
                     text-gray-300 text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 90 Days</option>
            </select>
          </div>
          {/* Add Chart.js implementation here */}
        </motion.div>

        {/* Progress Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 shadow-lg ${getCardBackground(isCyberpunk)}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-medium text-white">Progress Tracking</h3>
            </div>
            <select 
              className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 
                     text-gray-300 text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <option>Weight</option>
              <option>Body Fat %</option>
              <option>Muscle Mass</option>
            </select>
          </div>
          {/* Add Chart.js implementation here */}
        </motion.div>
      </div>

      {/* Workout History */}
      <WorkoutHistory />

      {/* Add Workout Modal */}
      <AnimatePresence>
        {showAddWorkout && (
          <AddWorkoutModal 
            isOpen={showAddWorkout} 
            onClose={() => setShowAddWorkout(false)} 
            isCyberpunk={isCyberpunk}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 