import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Dumbbell,
  Running,
  Bike,
  Swimming,
  Heart,
  X,
  Timer,
  Calendar
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';
import { useWorkoutStore } from '../stores/workoutStore';

const workoutTypes = [
  { id: 'strength', label: 'Strength', icon: Dumbbell, color: 'purple' },
  { id: 'cardio', label: 'Cardio', icon: Running, color: 'red' },
  { id: 'hiit', label: 'HIIT', icon: Heart, color: 'orange' },
  { id: 'cycling', label: 'Cycling', icon: Bike, color: 'green' },
  { id: 'swimming', label: 'Swimming', icon: Swimming, color: 'blue' }
];

export default function QuickAddWorkout() {
  const { isCyberpunk } = useTheme();
  const addWorkout = useWorkoutStore(state => state.addWorkout);
  const [showForm, setShowForm] = useState(false);
  const [workoutData, setWorkoutData] = useState({
    type: 'strength',
    duration: 60,
    date: new Date().toISOString().split('T')[0],
    exercises: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout(workoutData);
    setShowForm(false);
    setWorkoutData({
      type: 'strength',
      duration: 60,
      date: new Date().toISOString().split('T')[0],
      exercises: []
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quick Add Workout
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className={`p-2 rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Workout Type */}
            <div className="grid grid-cols-3 gap-2">
              {workoutTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = workoutData.type === type.id;
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setWorkoutData({ ...workoutData, type: type.id })}
                    className={`p-3 rounded-xl flex flex-col items-center space-y-2
                             ${isSelected
                               ? isCyberpunk
                                 ? `bg-${type.color}-500/20 border-2 border-${type.color}-500`
                                 : `bg-${type.color}-50 dark:bg-${type.color}-900/20 border-2 border-${type.color}-500`
                               : isCyberpunk
                                 ? 'bg-gray-900/50 hover:bg-gray-900/70 border border-gray-700'
                                 : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                             }`}
                  >
                    <Icon className={`h-6 w-6 ${
                      isSelected ? `text-${type.color}-500` : 'text-gray-500 dark:text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Duration and Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <div className="relative">
                  <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={workoutData.duration}
                    onChange={(e) => setWorkoutData({ ...workoutData, duration: Number(e.target.value) })}
                    className="pl-10 w-full px-3 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={workoutData.date}
                    onChange={(e) => setWorkoutData({ ...workoutData, date: e.target.value })}
                    className="pl-10 w-full px-3 py-2 rounded-lg border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
            >
              Save Workout
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 