import { z } from 'zod';

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

export const PreferencesSchema = z.object({
  dietaryRestrictions: z.array(z.enum([
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'keto',
    'paleo',
    'pescatarian'
  ])),
  allergies: z.array(z.string()),
  dislikedIngredients: z.array(z.string()),
  preferredIngredients: z.array(z.string()),
  calorieGoal: z.number().min(1000).max(5000),
  proteinGoal: z.number().min(0),
  carbGoal: z.number().min(0),
  fatGoal: z.number().min(0),
  mealTimes: z.object({
    breakfast: z.string(),
    lunch: z.string(),
    dinner: z.string(),
    snack: z.string()
  }),
  intermittentFasting: z.object({
    enabled: z.boolean(),
    fastingWindow: z.number().min(12).max(20),
    eatingWindow: z.number().min(4).max(12),
    startTime: z.string()
  })
});