export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface SuggestedPrompt {
  id: number;
  text: string;
  category: Category;
}

export type Category = 'nutrition' | 'exercise' | 'wellness' | 'mental';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutGoal = 'strength' | 'cardio' | 'flexibility' | 'weightLoss';
export type DietaryPreference = 'standard' | 'vegetarian' | 'vegan';
export type HealthGoal = 'weightLoss' | 'muscleGain' | 'maintenance' | 'energy';
export type MoodType = 'anxious' | 'stressed' | 'tired' | 'calm' | 'energetic';
export type StressLevel = 'low' | 'moderate' | 'high';
export type MeditationType = 'focus' | 'relaxation' | 'sleep' | 'stress';

export interface Exercise {
  name: string;
  duration: string;
  rest: string;
  sets: number;
  instructions?: string;
}

export interface WorkoutPlan {
  exercises: Exercise[];
  duration: number;
  level: FitnessLevel;
  goal: WorkoutGoal;
  warmup: {
    name: string;
    duration: string;
    exercises: string[];
  };
  cooldown: {
    name: string;
    duration: string;
    exercises: string[];
  };
  tips: string[];
}

export interface NutritionAdvice {
  suggestions: string[];
  tips: string[];
  preference: DietaryPreference;
  goal: HealthGoal;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface MentalWellnessPlan {
  mood: MoodType;
  stressLevel: StressLevel;
  meditation: {
    name: string;
    duration: string;
    description: string;
    instructions: string[];
  };
  recommendations: string[];
  stressManagementTips: string[];
  dailyAffirmation: string;
  journalPrompts: string[];
}

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}