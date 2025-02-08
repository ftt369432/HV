import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useWorkoutStore } from '../stores/workoutStore';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  type: 'weekly' | 'monthly' | 'custom';
  status: 'in-progress' | 'completed' | 'failed';
}

export default function GoalsTracker() {
  const { isCyberpunk } = useTheme();
  const stats = useWorkoutStore(state => state.getTotalStats());

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Weekly Workouts',
      target: 4,
      current: stats.weeklyWorkouts,
      unit: 'sessions',
      deadline: '2024-01-28',
      type: 'weekly',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Monthly Active Minutes',
      target: 1200,
      current: stats.monthlyDuration,
      unit: 'minutes',
      deadline: '2024-02-01',
      type: 'monthly',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Calories Burned',
      target: 3000,
      current: stats.weeklyCalories,
      unit: 'kcal',
      deadline: '2024-01-28',
      type: 'weekly',
      status: 'in-progress'
    }
  ];

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progress = Math.min((goal.current / goal.target) * 100, 100);
        const isCompleted = progress >= 100;

        return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${
              isCyberpunk
                ? 'bg-gray-900/50 backdrop-blur-sm border border-purple-500/20'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {isCompleted ? (
                  <Trophy className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Target className="h-5 w-5 text-purple-500" />
                )}
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {goal.title}
                </h4>
              </div>
              <span className={`text-sm ${
                isCompleted
                  ? 'text-green-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {goal.current} / {goal.target} {goal.unit}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full rounded-full ${
                  isCyberpunk
                    ? `bg-gradient-to-r ${
                        isCompleted
                          ? 'from-green-500 to-emerald-500'
                          : 'from-purple-500 to-pink-500'
                      }`
                    : isCompleted
                      ? 'bg-green-500'
                      : 'bg-purple-500'
                }`}
              />
            </div>

            {/* Goal Details */}
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < Math.floor(progress / 15)
                        ? isCyberpunk
                          ? 'bg-purple-500'
                          : 'bg-primary-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Add Goal Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 ${
          isCyberpunk
            ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400'
            : 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400'
        }`}
      >
        <Target className="h-5 w-5" />
        <span>Add New Goal</span>
      </motion.button>
    </div>
  );
} 