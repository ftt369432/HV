import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, PlusCircle } from 'lucide-react';

export default function MealPlanner() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CalendarDays className="h-5 w-5 text-green-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Meal Plan
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 
                   text-white rounded-lg hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 text-white" />
          <span>Add Meal</span>
        </motion.button>
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400">
        Your meal plan will appear here
      </div>
    </div>
  );
} 