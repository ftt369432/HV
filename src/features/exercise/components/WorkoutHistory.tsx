import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Dumbbell,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { useWorkoutStore } from '../stores/workoutStore';
import { useTheme } from '../../../contexts/ThemeContext';

export default function WorkoutHistory() {
  const { workouts, removeWorkout } = useWorkoutStore();
  const { isCyberpunk } = useTheme();

  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Workout History
      </h3>

      <div className="space-y-4">
        {sortedWorkouts.map((workout) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${
              isCyberpunk
                ? 'bg-gray-900/90 border border-gray-800/50 hover:bg-gray-900/70'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            } transition-colors shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  isCyberpunk
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'bg-primary-50 dark:bg-primary-900/10 text-primary-500'
                }`}>
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} Workout
                  </h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(workout.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{workout.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeWorkout(workout.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 ${
                    isCyberpunk
                      ? 'text-purple-400 hover:bg-purple-500/10'
                      : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                  } rounded-lg`}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Exercise List */}
            <div className="mt-4 space-y-2">
              {workout.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between px-4 py-2 rounded-lg
                         bg-gray-50 dark:bg-gray-700/50"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {exercise.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {exercise.sets} × {exercise.reps} 
                    {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                  </span>
                </div>
              ))}
            </div>

            {workout.notes && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {workout.notes}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 