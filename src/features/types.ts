// Mental Wellness Types
export type MoodType = 'anxious' | 'stressed' | 'tired' | 'calm' | 'energetic';
export type StressLevel = 'low' | 'moderate' | 'high';
export type MeditationType = 'focus' | 'relaxation' | 'sleep' | 'stress';

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

// Physical Wellness Types
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutGoal = 'strength' | 'cardio' | 'flexibility' | 'weightLoss';

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

// Nutrition Types
export type DietaryPreference = 'standard' | 'vegetarian' | 'vegan';
export type HealthGoal = 'weightLoss' | 'muscleGain' | 'maintenance' | 'energy';

export interface MealPlan {
  preference: DietaryPreference;
  goal: HealthGoal;
  days: {
    day: number;
    meals: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string;
    };
  }[];
  tips: string[];
}

export interface NutritionAdvice {
  suggestions: string[];
  tips: string[];
  preference: DietaryPreference;
  goal: HealthGoal;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

// Social Types
export interface SocialConnection {
  userId: string;
  name: string;
  type: 'friend' | 'mentor' | 'coach';
  lastInteraction: Date;
}

export interface SocialActivity {
  type: 'message' | 'challenge' | 'achievement' | 'support';
  timestamp: Date;
  participants: string[];
  description: string;
}

// Progress Tracking
export interface WellnessMetrics {
  mental: {
    moodScore: number;
    stressLevel: StressLevel;
    meditationMinutes: number;
  };
  physical: {
    workoutsCompleted: number;
    activeMinutes: number;
    stepsCount: number;
  };
  nutrition: {
    waterIntake: number;
    caloriesConsumed: number;
    mealsLogged: number;
  };
  social: {
    connectionsCount: number;
    activitiesParticipated: number;
    supportReceived: number;
  };
} 