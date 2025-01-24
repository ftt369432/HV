export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  date: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portions?: number;
  notes?: string;
  tags?: string[];
}

export interface NutritionState {
  meals: Meal[];
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  getDailyMacros: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface PreferencesState {
  isInitialized: boolean;
  preferences: {
    calorieGoal: number;
  };
}

export interface DailyNutrition {
  date: string | Date;
  meals: Meal[];
  totalCalories: number;
  macros: Macros;
  waterIntake: number;
}

export interface NutritionGoals {
  dailyCalories: number;
  macros: Macros;
  waterIntake: number;
}

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  difficulty: string;
  image: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
}

export interface FoodAnalysis {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portions: number;
  confidence: number;
}

export interface NutritionPreferences {
  dietType: string;
  allergies: string[];
  goals: string[];
  mealSchedule: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: number;
  };
  hydrationGoal: number;
}