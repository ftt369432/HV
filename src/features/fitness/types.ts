import { z } from 'zod';

export type ExerciseType = 'strength' | 'cardio' | 'flexibility' | 'hiit';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'arms' | 'shoulders' | 'core' | 'full_body';
export type IntensityLevel = 'low' | 'moderate' | 'high';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  muscleGroups: MuscleGroup[];
  description: string;
  instructions: string[];
  equipment?: string[];
  intensity: IntensityLevel;
  duration?: number; // in minutes
  sets?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  calories?: number;
}

export interface WorkoutSession {
  id: string;
  date: Date;
  exercises: Array<{
    exercise: Exercise;
    completed: boolean;
    actualSets?: number;
    actualReps?: number;
    actualWeight?: number;
    actualDuration?: number;
    actualDistance?: number;
    notes?: string;
  }>;
  duration: number;
  caloriesBurned: number;
  notes?: string;
}

export interface FitnessGoals {
  weeklyWorkouts: number;
  weeklyCaloriesBurn: number;
  targetMuscleGroups: MuscleGroup[];
  preferredTypes: ExerciseType[];
}

export interface FitnessStats {
  totalWorkouts: number;
  totalMinutes: number;
  totalCaloriesBurned: number;
  weeklyStreak: number;
  muscleGroupBalance: Record<MuscleGroup, number>;
}