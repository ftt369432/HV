import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Flame, 
  Timer, 
  Zap,
  Target,
  TrendingUp,
  Brain,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';
import WorkoutStats from './WorkoutStats';
import AICoach from './AICoach';
import QuickAddWorkout from './QuickAddWorkout';
import WorkoutHistory from './WorkoutHistory';
import ProgressChart from './ProgressChart';
import GoalsTracker from './GoalsTracker';

export default function WorkoutDashboard() {
  const { isCyberpunk } = useTheme();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className={`p-6 rounded-2xl ${
        isCyberpunk 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
          : 'bg-primary-50 dark:bg-gray-800'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <WorkoutStats />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Coach Section */}
        <div className="lg:col-span-2">
          <AICoach />
        </div>

        {/* Quick Add Workout */}
        <div className="lg:col-span-1">
          <QuickAddWorkout />
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-cyan-500" />
            <span>Progress Overview</span>
          </h3>
          <ProgressChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-500" />
            <span>Goals & Achievements</span>
          </h3>
          <GoalsTracker />
        </motion.div>
      </div>

      {/* Recent Workouts */}
      <WorkoutHistory />
    </div>
  );
} 