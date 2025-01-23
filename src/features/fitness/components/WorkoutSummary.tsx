import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Flame } from 'lucide-react';
import { WorkoutSession } from '../types';

interface WorkoutSummaryProps {
  workout: WorkoutSession;
  onClose: () => void;
}

export default function WorkoutSummary({ workout, onClose }: WorkoutSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Workout Complete!
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {workout.duration}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Minutes</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <Flame className="h-5 w-5 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {workout.caloriesBurned}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Completed Exercises
          </h4>
          <div className="space-y-2">
            {workout.exercises.map(({ exercise, completed }) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-sm text-gray-900 dark:text-white">
                  {exercise.name}
                </span>
                {completed && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close Summary
        </button>
      </motion.div>
    </motion.div>
  );
}