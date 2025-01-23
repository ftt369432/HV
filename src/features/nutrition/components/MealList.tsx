import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Meal } from '../types';

interface MealListProps {
  meals: Meal[];
}

export default function MealList({ meals }: MealListProps) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {format(new Date(meal.timestamp), 'HH:mm')}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {meal.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {meal.calories} kcal
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {meal.macros && (
              <div className="hidden md:flex space-x-4 mr-4 text-xs text-gray-500 dark:text-gray-400">
                <span>P: {meal.macros.protein}g</span>
                <span>C: {meal.macros.carbs}g</span>
                <span>F: {meal.macros.fat}g</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {meals.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No meals logged today
        </div>
      )}

      <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
        <Plus className="h-5 w-5" />
        <span>Add Meal</span>
      </button>
    </div>
  );
}