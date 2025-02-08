import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Dumbbell, 
  Wheat, 
  Beef 
} from 'lucide-react';
import { useNutritionStore } from '../stores';
import { format } from 'date-fns';

interface NutritionMetric {
  id: string;
  label: string;
  value: string;
  target: string;
  icon: React.ElementType;
  color: string;
  progress: number;
}

export default function NutritionDashboard() {
  const { getDailyMacros } = useNutritionStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const macros = getDailyMacros(today);

  const metrics: NutritionMetric[] = [
    {
      id: 'calories',
      label: 'Calories',
      value: `${macros.calories}`,
      target: '2000',
      icon: Flame,
      color: 'text-orange-500',
      progress: (macros.calories / 2000) * 100
    },
    {
      id: 'protein',
      label: 'Protein',
      value: `${macros.protein}g`,
      target: '150g',
      icon: Dumbbell,
      color: 'text-blue-500',
      progress: (macros.protein / 150) * 100
    },
    {
      id: 'carbs',
      label: 'Carbs',
      value: `${macros.carbs}g`,
      target: '250g',
      icon: Wheat,
      color: 'text-amber-500',
      progress: (macros.carbs / 250) * 100
    },
    {
      id: 'fat',
      label: 'Fat',
      value: `${macros.fat}g`,
      target: '65g',
      icon: Beef,
      color: 'text-red-500',
      progress: (macros.fat / 65) * 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                </div>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${metric.color.replace('text', 'bg')}`}
                  style={{ width: `${Math.min(metric.progress, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Target: {metric.target}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Meals */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Meals
        </h2>
        <div className="space-y-4">
          {/* Add meal components here */}
        </div>
      </div>
    </div>
  );
}