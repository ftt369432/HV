import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface PreferencesState {
  preferences: NutritionPreferences;
  isInitialized: boolean;
  updatePreferences: (preferences: Partial<NutritionPreferences>) => void;
  setInitialized: (value: boolean) => void;
}

const defaultPreferences: NutritionPreferences = {
  dietaryRestrictions: [],
  allergies: [],
  dislikedIngredients: [],
  preferredIngredients: [],
  calorieGoal: 2000,
  proteinGoal: 150,
  carbGoal: 200,
  fatGoal: 65,
  mealTimes: {
    breakfast: '08:00',
    lunch: '12:00',
    dinner: '18:00',
    snack: '15:00'
  },
  intermittentFasting: {
    enabled: false,
    fastingWindow: 16,
    eatingWindow: 8,
    startTime: '20:00'
  }
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      isInitialized: false,
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
      setInitialized: (value) => set({ isInitialized: value })
    }),
    {
      name: 'nutrition-preferences'
    }
  )
);