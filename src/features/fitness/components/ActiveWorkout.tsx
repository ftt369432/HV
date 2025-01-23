import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, CheckCircle, XCircle } from 'lucide-react';
import { Exercise } from '../types';

interface ActiveWorkoutProps {
  exercises: Exercise[];
  onComplete: (notes?: string) => void;
  onCancel: () => void;
}

export default function ActiveWorkout({ exercises, onComplete, onCancel }: ActiveWorkoutProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentExercise = exercises[currentExerciseIndex];

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsResting(true);
      setTimeout(() => setIsResting(false), 30000); // 30 seconds rest
    } else {
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatTime(timer)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </div>
        </div>

        {isResting ? (
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Rest Time
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              30 seconds until next exercise
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {currentExercise.name}
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Sets: {currentExercise.sets}</p>
              <p>Reps: {currentExercise.reps}</p>
              {currentExercise.weight && <p>Weight: {currentExercise.weight}kg</p>}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            {isPaused ? (
              <>
                <Play className="h-5 w-5" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{currentExerciseIndex === exercises.length - 1 ? 'Complete' : 'Next'}</span>
          </button>
        </div>

        <button
          onClick={onCancel}
          className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <XCircle className="h-5 w-5" />
          <span>End Workout</span>
        </button>
      </div>
    </div>
  );
}