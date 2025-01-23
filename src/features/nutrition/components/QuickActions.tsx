import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Apple, Droplet, Coffee, Utensils } from 'lucide-react';

const actions = [
  { icon: Apple, label: 'Add Snack' },
  { icon: Utensils, label: 'Log Meal' },
  { icon: Droplet, label: 'Add Water' },
  { icon: Coffee, label: 'Add Drink' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function QuickActions() {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <motion.button
              key={action.label}
              variants={itemVariants}
              className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <action.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}