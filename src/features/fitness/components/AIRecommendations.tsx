import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Brain, Dumbbell, RefreshCw, Play, Timer } from 'lucide-react';
import { Exercise } from '../types';
import { useFitnessStore } from '../stores/fitnessStore';
import WorkoutTimer from './WorkoutTimer';

export default function AIRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Exercise[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<Exercise | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const { workoutHistory, goals, startWorkout } = useFitnessStore();

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Mock recommendations for now
      const mockRecommendations: Exercise[] = [
        {
          id: '1',
          name: 'HIIT Circuit',
          type: 'hiit',
          muscleGroups: ['full_body'],
          description: 'High-intensity interval training for full body workout',
          instructions: ['30 seconds work', '15 seconds rest', 'Repeat 8 times'],
          intensity: 'high',
          duration: 20,
          sets: 3,
          reps: 12
        },
        {
          id: '2',
          name: 'Strength Training',
          type: 'strength',
          muscleGroups: ['chest', 'back'],
          description: 'Upper body strength focus',
          instructions: ['3 sets of 12 reps', 'Progressive overload'],
          intensity: 'moderate',
          duration: 45,
          sets: 3,
          reps: 12
        }
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWorkout = (workout: Exercise) => {
    setActiveWorkout(workout);
    setShowTimer(true);
  };

  const handleCompleteWorkout = (duration: number) => {
    if (activeWorkout) {
      startWorkout([{
        ...activeWorkout,
        duration,
        calories: Math.round(duration * 8)
      }]);
      setShowTimer(false);
      setActiveWorkout(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Recommendations
          </h3>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Brain className="h-5 w-5" />
          )}
          <span>Generate</span>
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((workout) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Dumbbell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {workout.name}
                </h4>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {workout.duration} min
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                >
                  {group.replace('_', ' ')}
                </span>
              ))}
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                {workout.intensity}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStartWorkout(workout)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                <Timer className="h-4 w-4" />
                <span>Schedule</span>
              </button>
            </div>
          </motion.div>
        ))}

        {recommendations.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Click generate to get personalized workout recommendations
          </div>
        )}
      </div>

      <AnimatePresence>
        {showTimer && activeWorkout && (
          <WorkoutTimer
            workout={activeWorkout}
            onComplete={handleCompleteWorkout}
            onClose={() => setShowTimer(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}