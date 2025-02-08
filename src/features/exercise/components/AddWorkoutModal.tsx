import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Dumbbell,
  Clock,
  Calendar,
  AlertCircle,
  Trash2,
  Running,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { useWorkoutStore } from '../stores/workoutStore';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';

const workoutTypes = [
  { id: 'strength', label: 'Strength', icon: Dumbbell },
  { id: 'cardio', label: 'Cardio', icon: Running },
  { id: 'hiit', label: 'HIIT', icon: Zap },
  { id: 'other', label: 'Other', icon: MoreHorizontal }
] as const;

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCyberpunk: boolean;
}

export default function AddWorkoutModal({ isOpen, onClose, isCyberpunk }: AddWorkoutModalProps) {
  const [workoutData, setWorkoutData] = useState({
    type: 'strength' as const,
    duration: 60,
    date: new Date().toISOString().split('T')[0],
    exercises: [] as Exercise[],
    notes: ''
  });

  const addWorkout = useWorkoutStore(state => state.addWorkout);

  const addExercise = () => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        id: crypto.randomUUID(),
        name: '',
        sets: 3,
        reps: 10
      }]
    }));
  };

  const removeExercise = (id: string) => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(e => e.id !== id)
    }));
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: prev.exercises.map(e => 
        e.id === id ? { ...e, ...updates } : e
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout(workoutData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto
                      ${getCardBackground(isCyberpunk)}`}
          >
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Workout
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Workout Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Workout Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {workoutTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setWorkoutData({ ...workoutData, type: type.id })}
                        className={`p-3 rounded-xl flex flex-col items-center space-y-2
                                ${workoutData.type === type.id
                                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                                  : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                } transition-colors`}
                      >
                        <Icon className={`h-6 w-6 ${
                          workoutData.type === type.id
                            ? 'text-primary-500'
                            : 'text-gray-500 dark:text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          workoutData.type === type.id
                            ? 'text-primary-700 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={workoutData.date}
                    onChange={(e) => setWorkoutData({ ...workoutData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={workoutData.duration}
                    onChange={(e) => setWorkoutData({ ...workoutData, duration: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Exercises</h3>
                  <button
                    type="button"
                    onClick={addExercise}
                    className="px-3 py-1.5 bg-primary-500 text-white rounded-lg 
                           hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Exercise</span>
                  </button>
                </div>

                {workoutData.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4"
                  >
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="Exercise name"
                        value={exercise.name}
                        onChange={(e) => updateExercise(exercise.id, { name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 
                               dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeExercise(exercise.id)}
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 
                               dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Sets</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, { sets: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Reps</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, { reps: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                        <input
                          type="number"
                          value={exercise.weight || ''}
                          onChange={(e) => updateExercise(exercise.id, { weight: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={workoutData.notes}
                  onChange={(e) => setWorkoutData({ ...workoutData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 
                         dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
                >
                  Save Workout
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 