import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkoutSession, FitnessGoals, FitnessStats, Exercise } from '../types';

interface FitnessState {
  workoutHistory: WorkoutSession[];
  currentWorkout: WorkoutSession | null;
  goals: FitnessGoals;
  stats: FitnessStats;
  startWorkout: (exercises: Exercise[]) => void;
  completeWorkout: (notes?: string) => void;
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void;
  updateGoals: (goals: Partial<FitnessGoals>) => void;
  getStats: () => FitnessStats;
}

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set, get) => ({
      workoutHistory: [],
      currentWorkout: null,
      goals: {
        weeklyWorkouts: 4,
        weeklyCaloriesBurn: 2000,
        targetMuscleGroups: ['full_body'],
        preferredTypes: ['strength', 'cardio']
      },
      stats: {
        totalWorkouts: 0,
        totalMinutes: 0,
        totalCaloriesBurned: 0,
        weeklyStreak: 0,
        muscleGroupBalance: {
          chest: 0,
          back: 0,
          legs: 0,
          arms: 0,
          shoulders: 0,
          core: 0,
          full_body: 0
        }
      },
      startWorkout: (exercises) => {
        set({
          currentWorkout: {
            id: Date.now().toString(),
            date: new Date(),
            exercises: exercises.map(exercise => ({
              exercise,
              completed: false
            })),
            duration: 0,
            caloriesBurned: 0
          }
        });
      },
      completeWorkout: (notes) => {
        const { currentWorkout, workoutHistory, stats } = get();
        if (currentWorkout) {
          const completedWorkout = {
            ...currentWorkout,
            notes,
            duration: Math.floor((Date.now() - new Date(currentWorkout.date).getTime()) / 60000)
          };
          
          set({
            workoutHistory: [...workoutHistory, completedWorkout],
            currentWorkout: null,
            stats: {
              ...stats,
              totalWorkouts: stats.totalWorkouts + 1,
              totalMinutes: stats.totalMinutes + completedWorkout.duration,
              totalCaloriesBurned: stats.totalCaloriesBurned + completedWorkout.caloriesBurned
            }
          });
        }
      },
      updateExercise: (exerciseId, updates) => {
        const { currentWorkout } = get();
        if (currentWorkout) {
          set({
            currentWorkout: {
              ...currentWorkout,
              exercises: currentWorkout.exercises.map(ex => 
                ex.exercise.id === exerciseId
                  ? { ...ex, exercise: { ...ex.exercise, ...updates } }
                  : ex
              )
            }
          });
        }
      },
      updateGoals: (newGoals) => {
        set(state => ({
          goals: { ...state.goals, ...newGoals }
        }));
      },
      getStats: () => get().stats
    }),
    {
      name: 'fitness-storage'
    }
  )
);