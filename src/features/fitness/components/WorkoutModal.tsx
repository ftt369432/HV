import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Dumbbell, Timer, Target } from 'lucide-react';
import { Exercise, ExerciseType, MuscleGroup, IntensityLevel } from '../types';

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (exercises: Exercise[]) => void;
}

const exerciseTypes: ExerciseType[] = ['strength', 'cardio', 'flexibility', 'hiit'];
const muscleGroups: MuscleGroup[] = ['chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'full_body'];
const intensityLevels: IntensityLevel[] = ['low', 'moderate', 'high'];

export default function WorkoutModal({ isOpen, onClose, onStart }: WorkoutModalProps) {
  const [selectedType, setSelectedType] = useState<ExerciseType>('strength');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroup[]>([]);
  const [intensity, setIntensity] = useState<IntensityLevel>('moderate');
  const [duration, setDuration] = useState(30);

  const handleMuscleGroupToggle = (group: MuscleGroup) => {
    setSelectedMuscleGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const handleStart = () => {
    // Here you would generate exercises based on selections
    const exercises: Exercise[] = [];
    onStart(exercises);
    onClose();
  };

  if (!isOpen) return null;

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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create Workout
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ExerciseType)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white"
            >
              {exerciseTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Muscle Groups
            </label>
            <div className="grid grid-cols-2 gap-2">
              {muscleGroups.map(group => (
                <button
                  key={group}
                  onClick={() => handleMuscleGroupToggle(group)}
                  className={`p-2 rounded-lg text-sm ${
                    selectedMuscleGroups.includes(group)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {group.replace('_', ' ').charAt(0).toUpperCase() + group.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Intensity
            </label>
            <div className="flex space-x-2">
              {intensityLevels.map(level => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`flex-1 p-2 rounded-lg text-sm ${
                    intensity === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min={5}
              max={120}
              step={5}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={selectedMuscleGroups.length === 0}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Start Workout</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}