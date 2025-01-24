import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

interface Workout {
  id: string;
  date: string;
  type: 'strength' | 'cardio' | 'hiit' | 'other';
  duration: number;
  exercises: Exercise[];
  notes?: string;
}

interface WorkoutStore {
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  removeWorkout: (id: string) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  getTotalStats: () => {
    totalWorkouts: number;
    caloriesBurned: number;
    totalDuration: number;
    streakDays: number;
  };
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      workouts: [],
      addWorkout: (workout) => set((state) => ({
        workouts: [...state.workouts, { ...workout, id: crypto.randomUUID() }]
      })),
      removeWorkout: (id) => set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id)
      })),
      updateWorkout: (id, updates) => set((state) => ({
        workouts: state.workouts.map((w) => 
          w.id === id ? { ...w, ...updates } : w
        )
      })),
      getTotalStats: () => {
        const workouts = get().workouts;
        const now = new Date();
        const streakMap = new Map<string, boolean>();
        
        workouts.forEach(workout => {
          streakMap.set(workout.date, true);
        });

        let streakDays = 0;
        let currentDate = new Date();
        
        while (streakMap.has(currentDate.toISOString().split('T')[0])) {
          streakDays++;
          currentDate.setDate(currentDate.getDate() - 1);
        }

        return {
          totalWorkouts: workouts.length,
          caloriesBurned: workouts.length * 300, // Placeholder calculation
          totalDuration: workouts.reduce((acc, w) => acc + w.duration, 0),
          streakDays
        };
      }
    }),
    {
      name: 'workout-store'
    }
  )
); 