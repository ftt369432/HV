import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PreferencesState } from '../types';

export type DietaryRestriction = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'pescatarian';

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface NutritionPreferences {
  dietaryRestrictions: DietaryRestriction[];
  allergies: string[];
  dislikedIngredients: string[];
  preferredIngredients: string[];
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
  mealTimes: Record<MealTime, string>;
  intermittentFasting: {
    enabled: boolean;
    fastingWindow: number;
    eatingWindow: number;
    startTime: string;
  };
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      isInitialized: false,
      preferences: {
        calorieGoal: 2000
      }
    }),
    {
      name: 'nutrition-preferences'
    }
  )
);