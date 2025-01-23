export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  macros?: Macros;
  timestamp: Date;
}

export interface DailyNutrition {
  date: Date;
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