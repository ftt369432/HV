import { z } from 'zod';

export const macroSchema = z.object({
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0)
});

export const mealSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  date: z.string(),
  time: z.string(),
  tags: z.array(z.string())
});

export const recipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  prepTime: z.string(),
  difficulty: z.string(),
  image: z.string().url(),
  tags: z.array(z.string()),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  isFavorite: z.boolean()
}); 