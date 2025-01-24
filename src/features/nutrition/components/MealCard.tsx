import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Heart } from 'lucide-react';
import type { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  onSave?: () => void;
  onShare?: () => void;
}

export default function MealCard({ meal, onSave, onShare }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {meal.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {meal.time}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {meal.calories} cal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Protein</p>
          <p className="font-medium text-gray-900 dark:text-white">{meal.protein}g</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Carbs</p>
          <p className="font-medium text-gray-900 dark:text-white">{meal.carbs}g</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Fat</p>
          <p className="font-medium text-gray-900 dark:text-white">{meal.fat}g</p>
        </div>
      </div>
    </motion.div>
  );
} 