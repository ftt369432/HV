import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Recipe } from '../../types/meals';
import { format } from 'date-fns';

interface MealPlannerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks: Recipe[];
  };
}

export default function MealPlanner({ selectedDate, onDateChange, meals }: MealPlannerProps) {
  const totalCalories = Object.values(meals)
    .flat()
    .filter(Boolean)
    .reduce((sum, meal) => sum + (meal?.totalCalories || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Meal Plan
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
        </div>
      </div>

      <div className="space-y-6">
        {['breakfast', 'lunch', 'dinner'].map((mealType) => (
          <div key={mealType} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {mealType}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(`2000-01-01 ${meals[mealType]?.prepTime || '00:00'}`), 'HH:mm')}</span>
              </div>
            </div>

            {meals[mealType] ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {meals[mealType].name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {meals[mealType].totalCalories} kcal
                    </p>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <button className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                + Add {mealType}
              </button>
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Total Calories</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {totalCalories} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}