import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Heart } from 'lucide-react';
import type { Recipe } from '../types';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMealPlan: () => void;
  onToggleFavorite: () => void;
}

export default function RecipeCard({ recipe, onAddToMealPlan, onToggleFavorite }: RecipeCardProps) {
  const { isCyberpunk } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl ${getCardBackground(isCyberpunk)}`}
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full 
                   ${isCyberpunk
                     ? 'bg-black/50 backdrop-blur-sm hover:bg-black/70'
                     : 'bg-white/80 hover:bg-white shadow-lg'
                   }`}
        >
          <Heart 
            className={`h-5 w-5 ${
              recipe.isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </motion.button>
      </div>

      {/* Recipe Info */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {recipe.name}
        </h3>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <Flame className="h-4 w-4" />
            <span>{recipe.calories} cal</span>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className={`p-2 rounded-lg ${
            isCyberpunk
              ? 'bg-gray-800/50 text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            <div className="font-medium">Protein</div>
            <div>{recipe.protein}g</div>
          </div>
          <div className={`p-2 rounded-lg ${
            isCyberpunk
              ? 'bg-gray-800/50 text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            <div className="font-medium">Carbs</div>
            <div>{recipe.carbs}g</div>
          </div>
          <div className={`p-2 rounded-lg ${
            isCyberpunk
              ? 'bg-gray-800/50 text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            <div className="font-medium">Fat</div>
            <div>{recipe.fat}g</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs rounded-full ${
                isCyberpunk
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Meal Plan Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToMealPlan}
          className={`w-full py-2 rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
        >
          Add to Meal Plan
        </motion.button>
      </div>
    </motion.div>
  );
} 