import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../../types/meals';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: () => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {recipe.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {recipe.macros.protein}g
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Protein
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {recipe.macros.carbs}g
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Carbs
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {recipe.macros.fat}g
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Fat
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}