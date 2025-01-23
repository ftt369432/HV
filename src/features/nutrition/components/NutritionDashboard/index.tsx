import React from 'react';
import { motion } from 'framer-motion';
import { useNutritionStore } from '../../stores/nutritionStore';
import MacroDistribution from '../MacroDistribution';
import WaterIntakeTracker from '../WaterIntakeTracker';
import MealList from '../MealList';
import AIChefChat from '../AIChef/AIChefChat';

export default function NutritionDashboard() {
  const { getCurrentDayLog, goals, logWaterIntake } = useNutritionStore();
  const todayLog = getCurrentDayLog();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Calories Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Calories
          </h3>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {todayLog.totalCalories}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              / {goals.dailyCalories}
            </span>
          </div>
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((todayLog.totalCalories / goals.dailyCalories) * 100, 100)}%`
              }}
            />
          </div>
        </motion.div>

        {/* Macros Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Macros
          </h3>
          <MacroDistribution
            macros={todayLog.macros}
            goals={goals.macros}
          />
        </motion.div>

        {/* Water Intake Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Water Intake
          </h3>
          <WaterIntakeTracker
            current={todayLog.waterIntake}
            goal={goals.waterIntake}
            onUpdate={logWaterIntake}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AIChefChat />
        </motion.div>
      </div>
    </div>
  );
}