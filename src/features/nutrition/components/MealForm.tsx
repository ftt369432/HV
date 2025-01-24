import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Meal } from '../types';

interface MealFormProps {
  onClose: () => void;
  onSubmit: (meal: Omit<Meal, 'id'>) => void;
  initialData?: Meal;
}

export default function MealForm({ onClose, onSubmit, initialData }: MealFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/10 max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Edit Meal' : 'Add Meal'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full 
                     transition-colors duration-200"
          >
            <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meal Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700 dark:text-white
                     focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                     transition-colors duration-200"
              placeholder="Enter meal name"
              defaultValue={initialData?.name}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Calories
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                       transition-colors duration-200"
                placeholder="0"
                defaultValue={initialData?.calories}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                       transition-colors duration-200"
                placeholder="0"
                defaultValue={initialData?.protein}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                       transition-colors duration-200"
                placeholder="0"
                defaultValue={initialData?.carbs}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                       transition-colors duration-200"
                placeholder="0"
                defaultValue={initialData?.fat}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg
                     transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg 
                     hover:bg-purple-700 dark:hover:bg-purple-600
                     transition-colors duration-200"
            >
              {initialData ? 'Update' : 'Add'} Meal
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 