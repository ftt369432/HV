import React from 'react';
import { Plus, Minus, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaterIntakeTrackerProps {
  current: number;
  goal: number;
  onUpdate: (amount: number) => void;
}

export default function WaterIntakeTracker({ current, goal, onUpdate }: WaterIntakeTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {(current / 1000).toFixed(1)}L
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Goal: {(goal / 1000).toFixed(1)}L
        </span>
      </div>

      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-center space-x-4">
        {[250, 500].map((amount) => (
          <React.Fragment key={amount}>
            <button
              onClick={() => onUpdate(amount)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{amount}ml</span>
            </button>
            <button
              onClick={() => onUpdate(-amount)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Minus className="h-4 w-4" />
              <span>{amount}ml</span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}