import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Target, 
  Droplets,
  Scale,
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';
import { DailyNutrition } from '../types';

interface MacroSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export default function MacroTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  
  const goals: MacroGoals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
    water: 2500
  };

  const mockDailyData: MacroSummary = {
    calories: 1850,
    protein: 135,
    carbs: 180,
    fat: 55,
    water: 2000
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90) return 'text-green-500 dark:text-green-400';
    if (percentage >= 70) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 
                    dark:from-purple-600 dark:to-blue-600 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md"
            >
              <PieChart className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">Macro Tracker</h2>
              <p className="text-purple-100">Track your nutrition goals</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setView('daily')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'daily'
                  ? 'bg-white text-purple-500'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setView('weekly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'weekly'
                  ? 'bg-white text-purple-500'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 
                   dark:hover:text-purple-400"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="text-lg font-medium">
            {format(selectedDate, 'MMMM d, yyyy')}
          </span>
        </div>
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 
                   dark:hover:text-purple-400"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calories Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                <Scale className="h-5 w-5 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="font-medium">Calories</h3>
            </div>
            <span className={`text-sm font-medium ${
              getProgressColor(mockDailyData.calories, goals.calories)
            }`}>
              {((mockDailyData.calories / goals.calories) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="relative pt-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>{mockDailyData.calories}</span>
              <span>{goals.calories}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(mockDailyData.calories / goals.calories) * 100}%` }}
                className="h-full bg-orange-500 dark:bg-orange-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Similar cards for Protein, Carbs, Fat, and Water */}
        {/* ... */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Macro Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Macro Distribution</h3>
          {/* Add Chart.js or other charting library implementation here */}
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Weekly Progress</h3>
          {/* Add Chart.js or other charting library implementation here */}
        </div>
      </div>
    </div>
  );
} 