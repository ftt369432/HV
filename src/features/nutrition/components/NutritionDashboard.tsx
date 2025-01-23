import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Droplet, PieChart } from 'lucide-react';
import { useNutritionStore } from '../stores/nutritionStore';
import MacroDistribution from './MacroDistribution';
import WaterIntakeTracker from './WaterIntakeTracker';
import MealList from './MealList';

export default function NutritionDashboard() {
  const { getCurrentDayLog, goals } = useNutritionStore();
  const todayLog = getCurrentDayLog();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Apple className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Calories
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {todayLog.totalCalories}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              / {goals.dailyCalories}
            </span>
          </div>
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${Math.min(
                  (todayLog.totalCalories / goals.dailyCalories) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <PieChart className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Macros
            </h3>
          </div>
          <MacroDistribution />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Droplet className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Water Intake
            </h3>
          </div>
          <WaterIntakeTracker />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Meals
        </h3>
        <MealList meals={todayLog.meals} />
      </motion.div>
    </div>
  );
}