import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Smile, Heart } from 'lucide-react';

const actions = [
  { icon: Brain, label: 'Meditate', color: 'text-purple-500' },
  { icon: Smile, label: 'Log Mood', color: 'text-yellow-500' },
  { icon: BookOpen, label: 'Journal', color: 'text-blue-500' },
  { icon: Heart, label: 'Self Care', color: 'text-red-500' }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <motion.button
          key={action.label}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center space-y-2"
        >
          <action.icon className={`h-6 w-6 ${action.color}`} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}